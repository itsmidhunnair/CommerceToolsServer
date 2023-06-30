const { Router } = require("express");
const { productRoutes } = require("./products.routes");

const router = Router();

router.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

router.use("/product", productRoutes);

module.exports = router;
