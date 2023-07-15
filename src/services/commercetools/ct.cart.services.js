const { adminApiRoot } = require("../../config/commercetools/clientApiRoot");

const { v4: uuidv4 } = require("uuid");

/**
 * Create a users cart
 *
 * @param {{auth_token:String,prod_id:String,qty:string, sku:String}}
 */
const createNewCart = async ({ auth_token = null, qty = 1, sku = null }) => {
  try {
    if (auth_token !== null) {
      console.log(
        "🚀 ~ file: ct.cart.services.js:20 ~ auth_token:",
        auth_token
      );

      const data = await adminApiRoot
        .me()
        .carts()
        .post({
          body: {
            currency: "EUR",
            lineItems: [{ quantity: qty, sku: sku }],
          },
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        })
        .execute();
      return {
        id: body.id,
        version: body.version,
        lineItems: body.lineItems,
        totalPrice: body.totalPrice,
      };
    } else {
      const id = uuidv4();
      console.log("🚀 ~ file: ct.cart.services.js:40 ~ id:", id);
      console.log("🚀 ~ file: ct.cart.services.js:41 ~ prod_id:", qty, sku);
      const { body } = await adminApiRoot
        .carts()
        .post({
          body: {
            currency: "EUR",
            anonymousId: id,
            lineItems: [{ quantity: qty, sku: sku }],
          },
        })
        .execute();
      console.log(body.id);
      return {
        id: body.id,
        version: body.version,
        lineItems: body.lineItems,
        totalPrice: body.totalPrice,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * To directly add product to cart when cart is already created
 *
 *@param {{sku:String,qty:String,cart_id:String, version:String}}
 */
const addProductToCart = async ({ sku, qty = 1, cart_id, version }) => {
  try {
    const { body } = await adminApiRoot
      .carts()
      .withId({ ID: cart_id })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "addLineItem",
              sku: sku,
              qty: qty,
            },
          ],
        },
      })
      .execute();
    return {
      id: body.id,
      version: body.version,
      lineItems: body.lineItems,
      totalPrice: body.totalPrice,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: ct.cart.services.js:88 ~ addProductToCart ~ error:",
      error
    );
  }
};

/**
 * To Line Items from cart ID
 *
 * @param {String} cart_id
 */
const getLineItems = async (id) => {
  try {
    console.log("🚀 ~ file: ct.cart.services.js:107 ~ getLineItems ~ id:", id);
    const { body } = await adminApiRoot
      .carts()
      .withId({ ID: id })
      .get()
      .execute();
    return body;
  } catch (error) {
    console.log(error);
  }
};

/**
 * To remove an item from cart
 *
 * @param {{cart_id:String, version:Int, lineItem_id:String}}
 */
const deleteLineItem = async ({ cart_id, version, lineItem_id }) => {
  console.log(
    "🚀 ~ file: ct.cart.services.js:126 ~ deleteLineItem ~ cart_id, version, lineItem_id:",
    cart_id,
    version,
    lineItem_id
  );
  try {
    const { body } = await adminApiRoot
      .carts()
      .withId({ ID: cart_id })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "removeLineItem",
              lineItemId: lineItem_id,
            },
          ],
        },
      })
      .execute();
    return {
      id: body.id,
      version: body.version,
      lineItems: body.lineItems,
      totalPrice: body.totalPrice,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: ct.cart.services.js:141 ~ deleteLineItem ~ error:",
      error
    );
  }
};

/**
 * To Delete Cart Using Cart ID
 *
 * @param {String} [cart_id]
 * @param {Int} [version]
 */
const deleteCartById = async (cart_id, version) => {
  const data = await adminApiRoot
    .carts()
    .withId({ ID: cart_id })
    .delete({ queryArgs: { version: version } })
    .execute();

  console.log(
    "🚀 ~ file: ct.cart.services.js:51 ~ deleteCartById ~ data:",
    data
  );
};

// deleteCartById("10165613-3bff-47e8-9181-6b4999b625b8", 1);

module.exports = {
  createNewCart,
  addProductToCart,
  getLineItems,
  deleteLineItem,
};
