const apiRoot = require("../../config/commercetools/clientApiRoot");
/**
 * To fetch all productProjections
 *
 * @returns {results}
 */
const fetchAllProducts = async (search) => {
  try {
    const data = await apiRoot
      .productProjections()
      .search()
      .get({ queryArgs: { "text.en": search } })
      .execute();
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

/**
 * To get Suggestion for Products from String
 *
 * @param {String} - ID
 *
 * @returns {results} - Specific Product
 */
const suggestProducts = async (search) => {
  try {
    const data = await apiRoot
      .productProjections()
      .suggest()
      .get({ queryArgs: { fuzzy: true, "searchKeywords.en": `${search}` } })
      .execute();
    const suggestion = data.body["searchKeywords.en"];
    return suggestion;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { fetchAllProducts, fetchProductById, suggestProducts };
