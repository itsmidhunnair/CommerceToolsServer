const {
  firebaseAuth,
  firebaseApp,
} = require("../../config/firebase/firebase.config");

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

const deleteUser = async (uid) => {
  await firebaseAuth.deleteUser(uid);
  console.log(
    deleteUser,
    "------------ User Deleted Successfully from firebase"
  );
};

/**
 * To check if a phone number and Email is already registered in firebase or not
 *
 * @param {{uid:String,email:String,phone:String}}
 *
 */
const checkUserExists = async ({ email, phone, uid }) => {
  try {
    const checkByEmail = await firebaseAuth.getUserByEmail(email);
    console.log(checkByEmail);
    if (checkByEmail.providerData === 2) {
      await deleteUser(uid);
    }
    return {
      isExisting: true,
      error: "Email Already Used!",
      msg: "Please Login using Email and Password",
    };
  } catch (error) {
    console.log(error.code);
    if (error.code === "auth/user-not-found") {
      try {
        console.log("check phone");
        const checkByPhone = await firebaseAuth.getUserByPhoneNumber(phone);
        console.log("check phone ----------", checkByPhone);

        return {
          isExisting: true,
          error: "Phone Number Already Used!",
          msg: "Please Login using Phone number and OTP",
        };
      } catch (error) {
        console.log(error);
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/invalid-phone-number"
        ) {
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

/**
 * To Get user details by UID
 *
 * @params uid - String
 *
 * @returns {{name:String, email: String}}
 */
const getUserFromUIDandUpdateEmail = async (uid) => {
  const userData = await firebaseAuth.getUser(uid);
  const updatedData = await firebaseAuth.updateUser(uid, {
    email: userData.providerData[0].email,
  });
  return { email: updatedData.email, name: updatedData.displayName };
};

module.exports = {
  checkUserExists,
  verifyToken,
  deleteUser,
  addEmailPassLogin,
  getUserFromUIDandUpdateEmail,
};
