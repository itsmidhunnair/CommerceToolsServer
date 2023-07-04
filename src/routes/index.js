const { Router } = require("express");
const { signInWithPhoneNumber } = require("firebase/auth");
const {
  app,
  auth,
  getAuthToken,
} = require("../services/commercetools/demoService");
const firebase = require("firebase");
const { productRoutes } = require("./products.routes");

const router = Router();

router.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

router.get("/auth", getAuthToken);
router.use("/product", productRoutes);

module.exports = router;
