const apiRoot = require("../config/commercetools/clientApiRoot");
const {
  fetchAllProducts,
} = require("../services/commercetools/product.services");

const getAllProducts = async (req, res) => {
  try {
    // Example call to return Project information
    // This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
    const response = await fetchAllProducts();
    res.status(200).json(response);
    return response;
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = { getAllProducts };
