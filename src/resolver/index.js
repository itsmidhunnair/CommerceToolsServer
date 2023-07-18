const { userResolver } = require("./userResolver");

const { productResolver } = require("./productResolver");

const { cartResolver } = require("./cartResolver");
const { orderResolver } = require("./orderResolver");

const resolvers = {
  Query: { ...productResolver, ...orderResolver },
  Mutation: {
    ...userResolver,
    ...cartResolver,
  },
};

module.exports = { resolvers };
