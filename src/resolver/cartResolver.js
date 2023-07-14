const { version } = require("uuid");
const {
  createNewCart,
  addProductToCart,
  getLineItems,
  deleteLineItem,
} = require("../services/commercetools/ct.cart.services");

const cartResolver = {
  /**
   * To Add Item to cart and Create cart if not exist
   */
  addToCart: async (parent, { input }, { token }) => {
    if (!input?.cart_id) {
      const cart = await createNewCart({
        auth_token: token,
        sku: input.sku,
        qty: input.quantity,
      });
      return cart;
    }
    if (input?.cart_id) {
      const addProduct = await addProductToCart({
        sku: input.sku,
        cart_id: input.cart_id,
        version: input.version,
      });
      return addProduct;
    }
  },

  /**
   * To fetch Line Items
   */
  fetchCart: async (parent, { cart_id }, { token }) => {
    try {
      const data = await getLineItems(cart_id);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  /**
   * To Remove a line item from cart
   */
  deleteFromCart: async (parent, { input }, { req, res }) => {
    console.log(
      "🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ file: cartResolver.js:50 ~ deleteFromCart: ~ input:",
      input
    );
    try {
      const data = await deleteLineItem({
        cart_id: input.cart_id,
        version: input.version,
        lineItem_id: input.item_id,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = { cartResolver };
