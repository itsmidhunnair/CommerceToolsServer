const {
  checkUserExists,
  registerUser,
} = require("../services/firebase/firebase.auth.services");

const userResolver = {
  Mutation: {
    checkUser: async (parent, { input }) => {
      console.log(input);
      const result = await checkUserExists(input);
      console.log(result);
      return result;
    },
    registerUser: async (parent, { token }) => {
      console.log(token);
      const result = await registerUser(token);
      console.log(result);
      return result;
    },
  },
};

module.exports = { userResolver };
