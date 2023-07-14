const { userResolver } = require("./userResolver");

const { productResolver } = require("./productResolver");

const { cartResolver } = require("./cartResolver");

const resolvers = {
  Query: { ...productResolver },
  Mutation: {
    ...userResolver,
    ...cartResolver,
  },
};

module.exports = { resolvers };
