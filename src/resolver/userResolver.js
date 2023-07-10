const {
  registerUserToCT,
  loginUserToCT,
} = require("../services/commercetools/ct.auth.services");
const {
  checkUserExists,
  verifyToken,
  deleteUser,
  addEmailPassLogin,
} = require("../services/firebase/firebase.auth.services");

const userResolver = {
  Mutation: {
    checkUser: async (parent, { input }) => {
      console.log(input);
      const result = await checkUserExists(input);
      console.log(result);
      return result;
    },
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

    loginUser: async (parent, { token }, { res }) => {
      console.log(token);
      try {
        const authToken = token.split(" ")[1];
        const { email, name } = await verifyToken(authToken);
        console.log(email);
        const result = await loginUserToCT({ email });
        console.log(result);
        res.cookie("token", result.access_token, { httpOnly: true });
        return {
          success: true,
          msg: "User Loggedin Successfully!",
          username: name,
        };
      } catch (error) {
        throw {
          success: false,
          msg: error,
        };
      }
    },
  },
};

module.exports = { userResolver };
