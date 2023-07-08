const jwt = require("jsonwebtoken");
const apiRoot = require("../../config/commercetools/clientApiRoot");
const { firebaseAuth } = require("../../config/firebase/firebase.config");

/**
 * To get User Details from the Received Token
 *
 * @param Token String
 *
 * @returns User Details
 */
const verifyToken = async (token) => {
  console.log("--------------------- from FB ", token);
  try {
    return await firebaseAuth.verifyIdToken(token);
  } catch (error) {
    throw error;
  }
};

/**
 * To check if a phone number and Email is already registered in firebase or not
 *
 * @param {*} req
 * @param {*} res
 *
 */
const checkUserExists = async ({ email, phone }) => {
  try {
    // const temp = await admin.auth().getUser("UUcjlSsQuxcRCtP1NYwNaWut4lq2");
    const checkByEmail = await firebaseAuth.getUserByEmail(email);
    // const temp = await admin.auth().createUser(data);
    console.log("Email", checkByEmail);
    return {
      isExisting: true,
      error: "Email Already Used!",
      msg: "Please Login using Email and Password",
    };
    // const result = await admin
    //   .auth()
    //   .verifyIdToken(
    //     "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5N2U3ZWVlY2YwMWM4MDhiZjRhYjkzOTczNDBiZmIyOTgyZTg0NzUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXV0aGVudGljYXRpb25kZW1vLWNhNzgzIiwiYXVkIjoiYXV0aGVudGljYXRpb25kZW1vLWNhNzgzIiwiYXV0aF90aW1lIjoxNjg4NDY5MjIwLCJ1c2VyX2lkIjoidjVIcHQ0Ym9JOGFlZHlUYjNlMUN0MXdWSUxQMiIsInN1YiI6InY1SHB0NGJvSThhZWR5VGIzZTFDdDF3VklMUDIiLCJpYXQiOjE2ODg0NjkyMjAsImV4cCI6MTY4ODQ3MjgyMCwicGhvbmVfbnVtYmVyIjoiKzkxOTYyNDI3NTE4MiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxOTYyNDI3NTE4MiJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.bFxnwxu7ufQWw3wISFxGVplilmBfMzVmd-2bK4OG04Smnquw-YCTrpFm8jxS9l4bu3FDojYMj6Ncsa0dX5L9C_eC3rOrUg9-C0WAgS68GeOi-i8-1FQd55etJWBB_vo-Od3-aSzSCnpjbgGBwX4SqZxpefmRqA0q3aoyhE9jSoSuguborgoPHOwqwLRjz8qHcXVBnQ071T5T1RVJTei8hj4Uu4BIeucS_Gz-0hElKH1IrcAhw7Ur2OalXBDm2ZRMzUYGGslklL9RMLyHlv-WX7a_BS4Dmh9aZ9bb-wejyFH7X1IF145ZwdNY4ZDtbTYvkhUBVCvJgzlmtoH0B3I3Sw"
    //   );
    // console.log(result);
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      try {
        const checkByPhone = await firebaseAuth.getUserByPhoneNumber(phone);
        return {
          isExisting: true,
          error: "Phone Number Already Used!",
          msg: "Please Login using Phone number and OTP",
        };
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          return {
            isExisting: false,
            error: false,
            msg: "New User",
          };
        }
      }
    } else {
      console.log(error);
    }
  }
};

/**
 * Decode Token and register user to CommerceTools
 *
 * @param {String} Token
 */
const registerUser = async (token) => {
  const authToken = token.split(" ")[1];
  const details = await verifyToken(authToken);
  try {
    // const password = await hashPassword(details.email);
    // const password = jwt.sign({ password: details.email }, process.env.JWT_KEY);
    const signupUser = {
      email: details.email,
      firstName: details.name,
      password: details.email,
      // password: details.email,
      custom: {
        type: {
          key: "cutomer-more-details",
          typeId: "type",
        },
        fields: {
          phone_number: details.phone_number,
        },
      },
    };

    const user = await apiRoot
      .me()
      .signup()
      .post({ body: signupUser })
      .execute();
    return { success: true, msg: "User Created in CommerceTools" };
  } catch (error) {
    // If user Creation is failed in CommerceTools then that user must be deleted from Firebase
    console.log(error);
    const deleteUser = await firebaseAuth.deleteUser(details.uid);
    console.log(
      deleteUser,
      "------------ User Deleted Successfully from firebase"
    );
    // firebaseAuth.deleteUser('')
    return { success: false, msg: error };
  }
};

/**
 * Decode Firebase Token and LoginUser to Commercetools
 *
 * @param {String} Token
 */
const loginUserToCT = async (token) => {
  try {
    const authToken = token.split(" ")[1];
    const details = await verifyToken(authToken);
    console.log(details.email);
    // const password = await hashPassword(details.email);
    // const password = jwt.sign({ password: details.email }, process.env.JWT_KEY);
    // console.log(password);
    const data = await apiRoot
      .me()
      .login()
      .post({ body: { email: details.email, password: details.email } })
      .execute();
    // const data = await apiRoot
    //   .login()
    //   .post({ body: { email: details.email, password } })
    //   .execute();
    console.log(data);
    return data.body.customer;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkUserExists, registerUser, loginUserToCT };
