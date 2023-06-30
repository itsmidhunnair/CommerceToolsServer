const {
  fetchAllProducts,
  fetchProductById,
} = require("../services/commercetools/product.services");

const resolvers = {
  Query: {
    products: async () => {
      try {
        const result = await fetchAllProducts();
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
  },
};

module.exports = { resolvers };
