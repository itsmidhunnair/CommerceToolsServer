const {
  fetchAllProducts,
  fetchProductById,
  suggestProducts,
} = require("../services/commercetools/product.services");

const productResolver = {
  products: async (parent, { search = null }, { token }) => {
    console.log(token);
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

  verify: async (root, args, ctx) => {
    console.log("🚀 ~ file: productResolver.js:37 ~ verify: ~ ctx:", ctx.res);
  },
};

module.exports = { productResolver };
