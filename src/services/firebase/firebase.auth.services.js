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


const deleteUser = async () => {
  await firebaseAuth.deleteUser(details.uid);
  console.log(
    deleteUser,
    "------------ User Deleted Successfully from firebase"
  );
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
 * To Add email & password Login method with phone number in firebase
 */
const addEmailPassLogin = async ({ uid, email, password, name }) => {
  try {
    const data = await firebaseAuth.updateUser(uid, {
      email,
      password,
      displayName: name,
    });
    return data.uid;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  checkUserExists,
  verifyToken,
  deleteUser,
  addEmailPassLogin,
};
