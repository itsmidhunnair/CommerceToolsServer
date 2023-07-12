const apiRoot = require("../../config/commercetools/clientApiRoot");
const { authClient } = require("../../config/commercetools/authClient");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../passwordHandling");
const { firebaseAuth } = require("../../config/firebase/firebase.config");


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
  console.log(email, name, phone_number);
  try {
    const password = await hashPassword(email);
    console.log(
      "🚀 ~ file: ct.auth.services.js:15 ~ registerUserToCT ~ password:",
      password
    );
    // const password = jwt.sign({ password: details.email }, process.env.JWT_KEY);
    const signupUser = {
      email: email,
      firstName: name,
      password: password,
      // password: details.email,
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
      .post({ body: signupUser })
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

module.exports = { registerUserToCT, loginUserToCT };
