const io = require("socket.io-client");
const readline = require("readline");
const forge = require("node-forge");

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

let username = "";
let targetUsername = "";
const users = new Map(); // Stores usernames and public keys
let keyPair; // RSA key pair for this client

// Generate RSA key pair
function generateRSAKeys() {
  const rsa = forge.pki.rsa;
  return rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
}

// Encrypt a message for the target user
function encryptMessage(message, publicKeyPem) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  return forge.util.encode64(publicKey.encrypt(message));
}

// Decrypt a message with the private key
function decryptMessage(encryptedMessage) {
  const privateKey = keyPair.privateKey;
  const decodedMessage = forge.util.decode64(encryptedMessage);
  return privateKey.decrypt(decodedMessage);
}

socket.on("connect", () => {
  console.log("Connected to the server");

  rl.question("Enter your username: ", (input) => {
    username = input;
    console.log(`Welcome, ${username} to the chat`);

    // Generate RSA key pair
    keyPair = generateRSAKeys();
    const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);

    // Register public key with the server
    socket.emit("registerPublicKey", {
      username,
      publicKey: publicKeyPem,
    });
    rl.prompt();

    rl.on("line", (message) => {
      if (message.trim()) {
        if ((match = message.match(/^!secret (\w+)$/))) {
          targetUsername = match[1];
          if (users.has(targetUsername)) {
            console.log(`Now secretly chatting with ${targetUsername}`);
          } else {
            console.log(`User ${targetUsername} not found.`);
            targetUsername = "";
          }
        } else if (message.match(/^!exit$/)) {
          console.log(`No more secretly chatting with ${targetUsername}`);
          targetUsername = "";
        } else {
          if (targetUsername && users.has(targetUsername)) {
            const recipientPublicKey = users.get(targetUsername);
            const encryptedMessage = encryptMessage(message, recipientPublicKey);

            // Send encrypted message with target info
            socket.emit("message", {
              username,
              message: encryptedMessage,
              target: targetUsername,
            });
          } else {
            // Send public message
            socket.emit("message", { username, message });
          }
        }
      }
      rl.prompt();
    });
  });
});

socket.on("init", (keys) => {
  keys.forEach(([user, key]) => users.set(user, key));
  console.log(`\nThere are currently ${users.size} users in the chat`);
  rl.prompt();
});

socket.on("newUser", (data) => {
  const { username: newUsername, publicKey } = data;
  users.set(newUsername, publicKey);
  console.log(`${newUsername} joined the chat`);
  rl.prompt();
});

socket.on("message", (data) => {
  const { username: senderUsername, message: senderMessage, target } = data;

  if (target === username) {
    // Message is encrypted for this user
    const decryptedMessage = decryptMessage(senderMessage);
    console.log(`${senderUsername} (secret): ${decryptedMessage}`);
  } else if (target) {
    // Secret message not directed to this user (show ciphertext)
    console.log(`${senderUsername} : ${senderMessage} [encrypted]`);
  } else {
    // Public message
    console.log(`${senderUsername}: ${senderMessage}`);
  }
  rl.prompt();
});

socket.on("disconnect", () => {
  console.log("Server disconnected, Exiting...");
  rl.close();
  process.exit(0);
});

rl.on("SIGINT", () => {
  console.log("\nExiting...");
  socket.disconnect();
  rl.close();
  process.exit(0);
});
