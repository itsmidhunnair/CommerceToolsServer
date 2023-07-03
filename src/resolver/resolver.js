const {
  fetchAllProducts,
  fetchProductById,
  suggestProducts,
} = require("../services/commercetools/product.services");

const resolvers = {
  Query: {
    products: async (parent, { search = null }) => {
      try {
        const result = await fetchAllProducts(search);
        return result;
      } catch (error) {
        console.log(error);
      }
    },

    product: async (parent, { id }) => {
      try {
        const result = await fetchProductById(id);
        return result;
      } catch (error) {
        console.log(error);
      }
    },

    suggest: async (parent, { search }) => {
      try {
        const result = await suggestProducts(search);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { resolvers };
