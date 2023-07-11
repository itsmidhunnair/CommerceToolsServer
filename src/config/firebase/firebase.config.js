const admin = require("firebase-admin");
const { firebaseCredentials } = require("./firebaseCredentials");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
});

const firebaseAuth = firebaseApp.auth();

module.exports = { firebaseAuth, firebaseApp };
