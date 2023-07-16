const { default: sdkAuth } = require("@commercetools/sdk-auth");
const { json } = require("express");
const { GraphQLError } = require("graphql");
const apiRoot = require("../config/commercetools/clientApiRoot");
const { cookieConfig } = require("../constants/cookie.config");
const {
  registerUserToCT,
  loginUserToCT,
} = require("../services/commercetools/ct.auth.services");
const {
  checkUserExists,
  verifyToken,
  deleteUser,
  addEmailPassLogin,
  getUserFromUIDandUpdateEmail,
} = require("../services/firebase/firebase.auth.services");

/**
 * All the Mutation Resolvers for User Authentication
 * 1) checkUser - {input}
 * 2) registerUser - {input}
 * 3) loginUser - token
 * 4) registerGoogleUser - token
 *
 * @type{}
 */
const userResolver = {
  // ----------- To check if a phone and email is present or not in firebase before signup ------------
  checkUser: async (parent, { input }) => {
    {
      console.log(input);
      const result = await checkUserExists({
        email: input.email,
        phone: input.phone,
      });
      console.log(result);
      return result;
    }
  },
  // ----------- To check if a phone and email is present or not in firebase before signup ------------

  // ----------- To Signup User ----------------------------
  registerUser: async (parent, { input }, { req, res }) => {
    console.log(input);
    try {
      const authToken = input.token.split(" ")[1];
      const { uid, phone_number } = await verifyToken(authToken);
      const data = await addEmailPassLogin({
        uid,
        email: input.email,
        password: input.password,
        name: input.name,
      });
      const result = await registerUserToCT({
        email: input.email,
        name: input.name,
        phone_number,
      });
      console.log(result);
      return result;
    } catch (error) {
      await deleteUser();
      throw { success: false, msg: error };
    }
  },
  // ----------- To Signup User ----------------------------

  // ----------- To Signin User ----------------------------
  loginUser: async (parent, { token }, {cookies, res}) => {
    console.log("🚀 ~ file: userResolver.js:70 ~ loginUser: ~ cookies:", cookies)
    try {
      const authToken = token.split(" ")[1];
      const { email, name } = await verifyToken(authToken);
      console.log(email);
      const result = await loginUserToCT({ email });
      console.log(
        "🚀 ~ file: userResolver.js:77 ~ loginUser: ~ result:",
        result
      );
      res.cookie("token", result.access_token, cookieConfig);
      return {
        success: true,
        msg: "User Loggedin Successfully!",
        username: name,
      };
    } catch (error) {
      console.log("🚀 ~ file: userResolver.js:84 ~ loginUser: ~ error:", error);
      throw {
        success: false,
        msg: error,
      };
    }
  },
  // ----------- To Signin User ----------------------------

  // ----------- To verify if Google User is unique and Register to CommerceTools ----------------------------
  registerGoogleUser: async (parent, { token }, { req, res }) => {
    console.log(token);
    const access_token = token.split(" ")[1];
    const { uid } = await verifyToken(access_token);
    let email;
    try {
      const updatedData = await getUserFromUIDandUpdateEmail(uid);
      email = updatedData.email;
      const data = await registerUserToCT({
        email,
        name: updatedData.name,
        phone_number: "",
      });
      const result = await loginUserToCT({ email });
      res.cookie("token", result.access_token, cookieConfig);
      return result;
    } catch (error) {
      if (error.code === 400) {
        try {
          console.log(
            "_________________________________________________________+++++++++++++"
          );
          console.log(
            "🚀 ~ file: userResolver.js:114 ~ registerGoogleUser: ~ email:",
            email
          );
          const result = await loginUserToCT({ email });
          console.log(
            "🚀 ~ file: userResolver.js:116 ~ registerGoogleUser: ~ access_token:",
            result.access_token
          );
          console.log(
            "_________________________________________________________+++++++++++++"
          );
          res.cookie("token", result.access_token, cookieConfig);
          return result;
        } catch (error) {
          console.log(error);
          throw new GraphQLError(
            JSON.stringify({
              success: false,
              msg: "Account with email already exist!, Please login with with email and password.",
            })
          );
        }
      }
      if (error.code === "auth/email-already-exists") {
        await deleteUser(uid);
        throw new GraphQLError(
          JSON.stringify({
            success: false,
            msg: "Account with email already exist!, Please login with with email and password.",
          })
        );
      }
    }
  },
  // ----------- To verify if Google User is unique and Register to CommerceTools ----------------------------
};

module.exports = { userResolver };
