const crypto = require('crypto');

const options = {
  modulusLength: 2048, // default is 2048 bits
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
};

// const { privateKey: senderPrivateKey, publicKey: senderPublicKey } = crypto.generateKeyPairSync("rsa", options);
// console.log("Private Key:", senderPrivateKey);
// console.log("Public Key:", senderPublicKey);

// Generate Alice's key pair
const { privateKey: alicePrivateKey, publicKey: alicePublicKey } = crypto.generateKeyPairSync("rsa", options);
console.log("Alice's Private Key:", alicePrivateKey);
console.log("Alice's Public Key:", alicePublicKey);

// Generate Bob's key pair
const { privateKey: bobPrivateKey, publicKey: bobPublicKey } = crypto.generateKeyPairSync("rsa", options);
console.log("Bob's Private Key:", bobPrivateKey);
console.log("Bob's Public Key:", bobPublicKey);

// Generate key twice, one for Alice (sender), one for Bob (recipient)

/**
 * Anyone can run this code to generate random PRIVATE KEY
 * and PUBlIC KEY. No need to worry about duplication since
 * the chance for two different persons to generate the same
 * PRIVATE KEY and PUBLIC KEY pair is very very very low.
 */