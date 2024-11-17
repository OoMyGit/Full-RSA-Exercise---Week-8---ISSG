const io = require("socket.io-client");
const readline = require("readline");
const crypto = require("crypto");

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

let registeredUsername = "";
let username = "";
const users = new Map();
let privateKey = null;
let publicKey = null;

// Generate RSA key pair
function generateKeyPair() {
  const { publicKey: pubKey, privateKey: privKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });
  return { publicKey: pubKey, privateKey: privKey };
}

({ publicKey, privateKey } = generateKeyPair());

socket.on("connect", () => {
  console.log("Connected to the server");

  rl.question("Enter your username: ", (input) => {
    username = input;
    registeredUsername = input;
    console.log(`Welcome, ${username} to the chat`);

    // Send public key to the server
    socket.emit("registerPublicKey", {
      username,
      publicKey,
    });
    rl.prompt();

    rl.on("line", (message) => {
      if (message.trim()) {
        if ((match = message.match(/^!impersonate (\w+)$/))) {
          username = match[1];
          console.log(`Now impersonating as ${username}`);
        } else if (message.match(/^!exit$/)) {
          username = registeredUsername;
          console.log(`Now you are ${username}`);
        } else {
          // Sign the message
          const signature = crypto.sign("sha256", Buffer.from(message), privateKey).toString("base64");
          socket.emit("message", { username, message, signature });
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
  const { username, publicKey } = data;
  users.set(username, publicKey);
  console.log(`${username} joined the chat`);
  rl.prompt();
});

socket.on("message", (data) => {
    const { username: senderUsername, message: senderMessage, signature } = data;
  
    // Validate message structure
    if (!senderMessage || !signature) {
      console.log(`Warning: Malformed message received from ${senderUsername}`);
      rl.prompt();
      return;
    }
  
    if (users.has(senderUsername)) {
      const senderPublicKey = users.get(senderUsername);
  
      try {
        const isValid = crypto.verify(
          "sha256",
          Buffer.from(senderMessage),
          senderPublicKey,
          Buffer.from(signature, "base64")
        );
  
        if (!isValid) {
          console.log(`⚠️ Warning: ${senderUsername} is fake!`);
        }
        // Always display the message, even if the user is fake
        console.log(`${senderUsername}: ${senderMessage}`);
      } catch (err) {
        console.log(`⚠️ Error verifying message from ${senderUsername}: ${err.message}`);
      }
    } else {
      console.log(`⚠️ Warning: Received a message from unknown user ${senderUsername}`);
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
