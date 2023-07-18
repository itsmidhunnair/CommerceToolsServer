const { authClient } = require("../../config/commercetools/authClient");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../passwordHandling");
const { firebaseAuth } = require("../../config/firebase/firebase.config");
const { apiRoot } = require("../../config/commercetools/clientApiRoot");

// const demoFunc = async() => {
//   const data = await firebaseAuth.createUser({ email: "varun@gmail.com" });
//   console.log("🚀 ~ file: ct.auth.services.js:10 ~ demoFunc ~ data:", data)
//   const result = await firebaseAuth.getUserByEmail("varun@gmail.com");
//   console.log("🚀 ~ file: ct.auth.services.js:11 ~ demoFunc ~ result:", result)
// }

// demoFunc()

/**
 * Register user to CommerceTools
 *
 * @param {{email:String, name:String, phone_number:String}} Token
 */
const registerUserToCT = async ({ email, name, phone_number }) => {
  try {
    const password = await hashPassword(email);
    // const password = jwt.sign({ password: details.email }, process.env.JWT_KEY);
    const signupUser = {
      email: email,
      firstName: name,
      password: password,
      custom: {
        type: {
          key: "cutomer-more-details",
          typeId: "type",
        },
        fields: {
          phone_number: phone_number,
        },
      },
    };

    const user = await apiRoot
      .me()
      .signup()
      .post({ body: { ...signupUser } })
      .execute();
    console.log(user);
    return { success: true, msg: "User Created in CommerceTools" };
  } catch (error) {
    console.log(error);
    // If user Creation is failed in CommerceTools then that user must be deleted from Firebase
    throw error;
  }
};

/**
 * Decode Firebase Token and LoginUser to Commercetools
 *
 * @param {{email:String}}
 */
const loginUserToCT = async ({ email }) => {
  try {
    const password = await hashPassword(email);
    console.log(
      "🚀 ~ file: ct.auth.services.js:15 ~ registerUserToCT ~ password:",
      password
    );
    const data = await authClient.customerPasswordFlow(
      {
        username: email,
        password: password,
      },
      { disableRefreshToken: false }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * To get customer userID and Email based on token
 *
 */
const getUserDetails = async ({ auth_token }) => {
  try {
    const { body } = await apiRoot
      .me()
      .get({
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .execute();
    console.log(
      "🚀 ~ file: ct.auth.services.js:94 ~ getUserDetails ~ body:",
      body
    );
    return { email: body.email, firstName: body.firstName, userId: body.id };
  } catch (error) {
    console.log(
      "🚀 ~ file: ct.auth.services.js:99 ~ getUserDetails ~ error:",
      error
    );
    throw error;
  }
};

// WInjaem761bgSCy_XQaaIKlho8oMrJav;

// getUserDetails({ auth_token: "Bearer WInjaem761bgSCy_XQaaIKlho8oMrJav" });

module.exports = { registerUserToCT, loginUserToCT, getUserDetails };
