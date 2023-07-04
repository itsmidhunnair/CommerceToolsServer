const admin = require("firebase-admin");

/**
 * To Verify User IDToken Token received from frontend
 *
 * @param {*} req
 * @param {*} res
 */
const getAuthToken = async (req, res) => {
  try {
    const firebaseConfig = {
      apiKey: "AIzaSyAagsvP52W2xh06URgS_VfXJQApKFCC6Y4",
      authDomain: "fir-e0e4e.firebaseapp.com",
      projectId: "fir-e0e4e",
      storageBucket: "fir-e0e4e.appspot.com",
      messagingSenderId: "980923376633",
      appId: "1:980923376633:web:bf7ec05132550f4c40d328",
    };
    admin.initializeApp(firebaseConfig);
    const result = await admin
      .auth()
      .verifyIdToken(
        "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5N2U3ZWVlY2YwMWM4MDhiZjRhYjkzOTczNDBiZmIyOTgyZTg0NzUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXV0aGVudGljYXRpb25kZW1vLWNhNzgzIiwiYXVkIjoiYXV0aGVudGljYXRpb25kZW1vLWNhNzgzIiwiYXV0aF90aW1lIjoxNjg4NDY5MjIwLCJ1c2VyX2lkIjoidjVIcHQ0Ym9JOGFlZHlUYjNlMUN0MXdWSUxQMiIsInN1YiI6InY1SHB0NGJvSThhZWR5VGIzZTFDdDF3VklMUDIiLCJpYXQiOjE2ODg0NjkyMjAsImV4cCI6MTY4ODQ3MjgyMCwicGhvbmVfbnVtYmVyIjoiKzkxOTYyNDI3NTE4MiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxOTYyNDI3NTE4MiJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.bFxnwxu7ufQWw3wISFxGVplilmBfMzVmd-2bK4OG04Smnquw-YCTrpFm8jxS9l4bu3FDojYMj6Ncsa0dX5L9C_eC3rOrUg9-C0WAgS68GeOi-i8-1FQd55etJWBB_vo-Od3-aSzSCnpjbgGBwX4SqZxpefmRqA0q3aoyhE9jSoSuguborgoPHOwqwLRjz8qHcXVBnQ071T5T1RVJTei8hj4Uu4BIeucS_Gz-0hElKH1IrcAhw7Ur2OalXBDm2ZRMzUYGGslklL9RMLyHlv-WX7a_BS4Dmh9aZ9bb-wejyFH7X1IF145ZwdNY4ZDtbTYvkhUBVCvJgzlmtoH0B3I3Sw"
      );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAuthToken };
