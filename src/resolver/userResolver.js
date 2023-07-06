const {
  checkUserExists,
  registerUser,
  loginUserToCT,
} = require("../services/firebase/firebase.auth.services");

const userResolver = {
  Mutation: {
    checkUser: async (parent, { input }) => {
      console.log(input);
      const result = await checkUserExists(input);
      console.log(result);
      return result;
    },
    registerUser: async (parent, { input }) => {
      console.log(input);
      console.log(input.token);
      const result = await registerUser(input.token, input.password);
      console.log(result);
      return result;
    },
    loginUser: async (parent, { input }) => {
      console.log(input);
      const result = await loginUserToCT(input.token, input.password);
      console.log(result);
      return result;
    },
  },
};

module.exports = { userResolver };
