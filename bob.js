const crypto = require("crypto");

const recipientPrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC3gl/nGbCmYF9k
WhDe9SOwEkfXR3fW0md8cD6bgKSbzMj2BDfSTdzSgzaasM7bLGrQjR7FGGQP5whD
sd0AQx62HClf+I4K8Kb7WDDZmUrUr9y9cViLzJ2ckwah5h7e5J2eImC8em9KOV96
MPWnb+oY1BxoH99BRBL8f+JLZmJV1K0+76MlSeTZhxGv/8nyJ6lsMywFpWkckysW
ysZPqajppc5/UvFn1vh6YNjHnmOQQc01WluVjAsZn08qeCJ0CY0vIR7m5wZ/++v3
aS8rncaQgRRrNwU/UEsd0H4wcXHZ+BPt1Y/mkcjiBcKizthFWK4Rty0AHpI+Scoy
pxFihaYvAgMBAAECggEAWR9f3ThcUwlF+tJFFEtA6E+QhWyntnScHtLSjSoWh7YW
uWiGBcSb5L8mA02wQMCbJasL0RQN8K03Fc1pdCmk3jPiIkJwFb8XkcUcgGmS7qV0
UqscIlUfDL5Y/8Lnpj+ojvbKPW9G4mjnxkvF2mofaqyFGUq1XhimEew35n+UbXMY
TulC7MNqU5k8xnWrkSjKy/MZQbS1v/SD4a6XMwjupZAd750g+nksphc0NW71FFw5
+qdBvA41uZJ8eNBiFMmrLX/yZTXpQKwNzVHX0w2P4pgdmmsgZWsmEbGdS/IMGZcn
U8c7FNklHY3sb8JKyiA7SKokhXnPzpjPpHUYslvLbQKBgQDlLPTRM3d+kj473XFg
iT7Zw65kG9dCrtBd0Dgcos485F2vfdqlHatH2YT7CvSa7IDymYDdRpaYHmFlx569
IlRo8V18rMCC+gkIZUNjAVyw9cCzrLBZSdFQL3Z+86InhWJszYAGUl+g1kjvZVce
mgO6nmop1e1gk+1OPxChvbeg2wKBgQDM/REvbe+zKIsSPJfQXfCTv0wvFnshKMDD
pYB7eHinuYJwCs2swgcd8bBxa1qn00P5VJTtQ7wuEugwGUSceTBuO4LY6jxWynQW
72gC4AZ7mhV59Yfwo4EVZObEfX5fUFLfIIGv6WUMql8YSvAjYm3QHSTHfO/ckfUg
226pZcyWPQKBgBOe/LroiCOLC87+T5WvSnVEfqrNg2mPJAHUMOmqurOV7bt3r/+R
AbgeFHeV4YleFFAw+kp3n68YcshPBfU1ejqd554kADt2gs14NgPE+xWfhMcdUt/i
JQyTc7a8zzZJAjtEgOCJruxLTGVKrOHO1+DjbT11tmQdZiTb22Wto4ofAoGAHJHQ
yVl7JO8rotkLF6FgHFd3GMD7XD2/0ATLCWpa9pVmVpNK4x8Put6qhsQ9mFJbkO52
6zKbkZhVAA8lfuFtHI/yxqSu0DHbSC8JwgzTGnr5L0xHLAS9wuuTNiN/b21Uf4Ca
Upgm20MLiek32tanE3BcZelFzOoSzgeHPtjPUMkCgYBwcxAq2bdg+UK/XeYL/m9t
onTTuOJ+nvclF9HZ06ygbEB1VgnFfOn50AilPfY69+NVLEiyHwXoSNdlIH+xbBZu
qN3wKaWDZ58HFVq+b+rdbbEn5Ot9q4nq380hEmIhb07hm8zwDoDPs5tRDJl4PSMk
+wyn03TQHAuQ9CMoSbvNMA==
-----END PRIVATE KEY-----`;
const recipientPrivateKey = crypto.createPrivateKey(recipientPrivateKeyPem);

const senderPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAskkGKB3G+SSWVMZupryD
8e9M5tWW9U4GJjoMHvmMEwW4YiSPMOPKfnOjiPz9BuB7+6f3EyLAd9+JtRqfzI0O
5hh9/cRSQIHYbzJOyH81nBynU3PtoavkEE5Kb+6AnpsDTYYVL7G+fv4ESRIpxu2o
i4FolvXCtf6k6Mvh2ZV0slK2zFqK6cZwCGHZzE11XyTgfLoeAhUjT2HBcEHZot7B
UiOl2gMiPS/Ft5Gl+jrNz8ZPVJWy40wrGkeDyJvdj5Mo+PT5ZtLR59pIz4e/5DqZ
mCOL0VJSNESUmwLRhYOZbPbBxw0T2JGZHoReRJX5S84xJEVruz1fAxUjmyyF0xSI
tQIDAQAB
-----END PUBLIC KEY-----`;
const senderPublicKey = crypto.createPublicKey(senderPublicKeyPem);

// FROM ALICE
const signatureHex = "523642577bd44b84464a5d33f4fd0c2ea3c506188d94c25fdb6522574ebb3b942ba7be13e30a4de101aa0a1a3ea3db44f7cf7c45a6b70c9975589b678971be0dee075a9c778f85967b64acc38e474880bd249f27eef2b02e8c1dcddaa02d00acbcb6d629d33fd4d6c7787da8225c4d432b2d86b53d449d5b8aaed0307c6591b5e41d1a53ec329381656ecfc5d9edec905c38da7321376e7d740b676f7ba624cbde0f768752272ac6f8ce82ddb46a2cb475d3098ba6ef2f31bcb086c3c9e25ed84e785b24ce1a5c04646992b9d5a6b60b7861d93c53dc7039c1326fd7665ef456052bcd71d2855c3e778c20451db1ff59a5e90a0d7ab3ac74d02283389ae16541";
const signature = Buffer.from(signatureHex, "hex");

const ciphertextHex = "630977318c5336dfd5a30d2b1f86fa0d69dfcc6e374cc11b71e1afc18a74634f1ddfc899fb8d91473ac2e7ea8ee8b7a44cc867786e4f8b3e02578d9691c4ba6ab5d8fcab5788921d303cb60d5af5c7ed8ea623ccdab7cda21cb45be98eac0bbf251e3ff68e13a79bb0caa2f48ba7fd2b523813ade523d6b8d679f4b052d60b362558835bdd6d0b310539332a9e319401aaaa5174368f3d70d186a06f964417edf53b0cd93ae522ce034c7f474708eadf515628b29f331fb23b3877b30cf9662d29ab055e58ce19f4722ad572a12f199f59cf4146c5d7b2b0f4fa49c277f5bfe7aea5ecebb9863fcb249732b7ac7c727eaea006ef12691f9b636205f7941b9c6e";
const ciphertext = Buffer.from(ciphertextHex, "hex");

// Bob decrypting plaintext
const recoveredPlaintext = crypto.privateDecrypt(recipientPrivateKey, ciphertext);
const message = recoveredPlaintext.toString("utf8");
const data = Buffer.from(message);

// Bob verifies signature
const isValid = crypto.verify("sha256", data, senderPublicKey, signature);

console.log("Signature verification:", isValid);
console.log("Message:", message);

