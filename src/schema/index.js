const cartTypeDef = require("./cart.typeDef");
const orderTypeDef = require("./order.typeDef");
const productTypeDefs = require("./product.typeDef");
const userTypeDef = require("./user.typeDef");

const typeDefs = [cartTypeDef, productTypeDefs, userTypeDef, orderTypeDef];

module.exports = { typeDefs };
