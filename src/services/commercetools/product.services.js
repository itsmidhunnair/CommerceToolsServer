const apiRoot = require("../../config/commercetools/clientApiRoot");

/**
 * To fetch all productProjections
 *
 * @returns {results}
 */
const fetchAllProducts = async () => {
  try {
    const data = await apiRoot.productProjections().get().execute();
    return data.body.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * To fetch product from productProjections by ID
 *
 * @param {String} - ID
 *
 * @returns {results} - Specific Product
 */
const fetchProductById = async (id) => {
  try {
    const data = await apiRoot
      .productProjections()
      .withId({ ID: id })
      .get()
      .execute();
    return data.body;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { fetchAllProducts, fetchProductById };
