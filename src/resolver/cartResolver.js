const { version } = require("uuid");
const {
  createNewCart,
  addProductToCart,
  getLineItems,
  deleteLineItem,
  updateLineItemQty,
  addShippingAddress,
  addShippingMethod,
  addBillingAddress,
  createOrder,
} = require("../services/commercetools/ct.cart.services");

/**
 * All the Resolvers regarding Cart
 *
 * 1) addToCart - TO create (if not present) and add item to cart
 * 2) fetchCart - To fetch all line items in cart
 * 3) deleteFromCart - To remove an line item from cart
 * 4) updateItemQty - To update a line item quantity present in cart
 */
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
      const data = await getLineItems({ cart_id, token });
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

  /**
   * Update line item quantity
   */
  updateItemQty: async (parent, { input }, { req, res }) => {
    try {
      const data = await updateLineItemQty({
        cart_id: input.cart_id,
        version: input.version,
        lineItem_id: input.item_id,
        quantity: input.quantity,
      });
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartResolver.js:83 ~ updateItemQty: ~ error:",
        error
      );
      throw error;
    }
  },

  /**
   * To Update Shipping Address to the Cart
   *
   */
  addShippingAddr: async (parent, { input }, { req, res }) => {
    try {
      const data = await addShippingAddress(input);
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartResolver.js:99 ~ addShippingAddr: ~ error:",
        error
      );
      throw error;
    }
  },

  /**
   * To Update Billing Address to the Cart
   *
   */
  addBillingAddr: async (parent, { input }, { req, res }) => {
    try {
      const data = await addBillingAddress(input);
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: cartResolver.js:99 ~ addShippingAddr: ~ error:",
        error
      );
      throw error;
    }
  },

  /**
   * To update shipping method to the cart
   */
  addShippingMeth: async (parent, { input }, { req, res }) => {
    try {
      const data = await addShippingMethod(input);
      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Place Order from cart
   */
  placeOrder: async (parent, { input }, { req, res }) => {
    try {
      const data = await createOrder({
        cart_id: input.cart_id,
        version: input.version,
      });
    } catch (error) {}
  },
};

module.exports = { cartResolver };
