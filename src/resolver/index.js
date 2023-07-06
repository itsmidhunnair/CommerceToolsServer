const { userResolver } = require("./userResolver");

const { productResolver } = require("./productResolver");

const resolvers = { ...productResolver, ...userResolver };

module.exports = { resolvers };
