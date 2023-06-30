const { Router } = require("express");
const { getAllProducts } = require("../controller/products.controller");

const productRoutes = Router();

productRoutes.get("/", getAllProducts);

module.exports = { productRoutes };
