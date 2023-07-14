const cartTypeDef = require("./cart.typeDef");
const productTypeDefs = require("./product.typeDef");
const userTypeDef = require("./user.typeDef");

const typeDefs = [cartTypeDef, productTypeDefs, userTypeDef];

module.exports = { typeDefs };
