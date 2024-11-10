const crypto = require("crypto");

/**
 * First of all, the SENDER obtains the RECIPIENT PUBLIC KEY.
 */
const senderPrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCySQYoHcb5JJZU
xm6mvIPx70zm1Zb1TgYmOgwe+YwTBbhiJI8w48p+c6OI/P0G4Hv7p/cTIsB334m1
Gp/MjQ7mGH39xFJAgdhvMk7IfzWcHKdTc+2hq+QQTkpv7oCemwNNhhUvsb5+/gRJ
EinG7aiLgWiW9cK1/qToy+HZlXSyUrbMWorpxnAIYdnMTXVfJOB8uh4CFSNPYcFw
Qdmi3sFSI6XaAyI9L8W3kaX6Os3Pxk9UlbLjTCsaR4PIm92Pkyj49Plm0tHn2kjP
h7/kOpmYI4vRUlI0RJSbAtGFg5ls9sHHDRPYkZkehF5ElflLzjEkRWu7PV8DFSOb
LIXTFIi1AgMBAAECggEAJIb0GTeCmux9VWijZot0oBamg5vKtj8SYPYfIiCAK6yO
GqOBZ+OfyvkfzhMBN026cTS4WSYTV2wH74BBMbxLy2ZEt/+nV3qS8LNWs1rmzbGM
MbuseeV5EEMuGpE7rmM1kcZRJGivDh82mw762rw5/j0ZA+bdygJeYKjXAMiPdHJI
ztfzY63q5A1Ae0nLvvCUxVEcDxYi7+zBamCiNiCMxDbFvxrvGNK4wPTiNdjcQd+T
iQKj4JENxUX57uome6VREN9KU0tLM9tE7gVIL+9J6mu8sJL/fa22K7+1A7x0B+OR
nF29fKuPhLLnes8b//pEIXFL8xSyWxWmKf6iwQa72QKBgQDef5yg+uLe08p8rz+u
GMh8FHST1gAfi6JRvw+K326BDqHJD//YU0m8XovxtmsgzZ3eNAbKPdDqGRegAiGb
JPPlDlKvApp1MtHrnVIX1ApMKoQ3GzvH7iDH6tmdnKS8kWG43Vu+3RXnoR+XOTau
uTVBweSZ7XW1NpatgZJTfGP9LQKBgQDNIS0yJZUk07c3lPZYlGLGdGPims/eIe2/
/B+xbaIP7VbNpgSjdxQtx2aLlDvaRoaoJi8dgvz3PiKrI0/JqvB4vT76c781jFBJ
6kjycG7NfRJ9jIHGIdW6dkoRKKG0UoHjWZK3Gdgq/ZkDnyOoTEmcM48ZTXSV7oaz
13BJFLe+qQKBgEjZm50RyEqRKdFdSApmzu3hfLIS9YNeos0FM7+SnInhEpPUiz53
NsNYaZXA1p6s9C2W90osp0Se5p9bU0mK9dhfsi7fOVd6RkVRA1oN8TkzCotIfXBe
xZjvikUSztV2/Hoc8Dc0CEII/WD0OLVIqulW5NSJbWrh7r/sls6DAfIZAoGATIZg
9wFAR5HYGxsuX9NTmheXn9UDUSo1KNck96sft3NiW6vgtR7aX02xOscdIQwIdjhw
gUD5oD8E7fVpcaGcvl5TXVnK7m4fEcQeXJuHKo/LUx0U2NaMhlhUv1v6H2xcWnVz
H2270CX1bH107vcuyuANNXJI2Ro4FGV91TWuaqkCgYEAsW4cgsH8afOUTgTlb4+P
xc6CXYte50rN1zegzOtXQM4iozWQdcRblxS8P6IvGcsNkClSDrXPiGKI7wdaGoiZ
NJp0HFupB4G5tFY5Jxf9s+iw5pU3esBjmlvliRTZ+mhk3/QANeZkz2tJhFXfkxca
Oc2OoDc7YGBeSsxDj+YTBuI=
-----END PRIVATE KEY-----`;
const senderPrivateKey = crypto.createPrivateKey(senderPrivateKeyPem);

const recipientPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt4Jf5xmwpmBfZFoQ3vUj
sBJH10d31tJnfHA+m4Ckm8zI9gQ30k3c0oM2mrDO2yxq0I0exRhkD+cIQ7HdAEMe
thwpX/iOCvCm+1gw2ZlK1K/cvXFYi8ydnJMGoeYe3uSdniJgvHpvSjlfejD1p2/q
GNQcaB/fQUQS/H/iS2ZiVdStPu+jJUnk2YcRr//J8iepbDMsBaVpHJMrFsrGT6mo
6aXOf1LxZ9b4emDYx55jkEHNNVpblYwLGZ9PKngidAmNLyEe5ucGf/vr92kvK53G
kIEUazcFP1BLHdB+MHFx2fgT7dWP5pHI4gXCos7YRViuEbctAB6SPknKMqcRYoWm
LwIDAQAB
-----END PUBLIC KEY-----`;
const recipientPublicKey = crypto.createPublicKey(recipientPublicKeyPem);

const message = "I want some apples";

// Alice generate Ciphertext
const data = Buffer.from(message);
const signature = crypto.sign("sha256", data, senderPrivateKey);
console.log("Signature:", signature.toString("hex"));
const ciphertext = crypto.publicEncrypt(recipientPublicKey, data);
console.log("Message:", ciphertext.toString("hex"));