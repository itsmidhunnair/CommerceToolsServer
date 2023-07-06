const admin = require("firebase-admin");
const firebasePrivateKey = require("./firebase.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(firebasePrivateKey),
});

const firebaseAuth = app.auth();

module.exports = { firebaseAuth };
