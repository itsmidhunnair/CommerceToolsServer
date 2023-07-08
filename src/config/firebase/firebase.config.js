const admin = require("firebase-admin");
const { firebaseCredentials } = require("./firebaseCredentials");

const app = admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
});

const firebaseAuth = app.auth();

module.exports = { firebaseAuth };
