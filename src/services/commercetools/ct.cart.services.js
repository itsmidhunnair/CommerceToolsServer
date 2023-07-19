const {
  adminApiRoot,
  apiRoot,
} = require("../../config/commercetools/clientApiRoot");

const crypto = require("crypto");

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
      anonymousId: body.anonymousId,
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
 * @param { cart_id, token }
 */
const getLineItems = async ({ cart_id, token }) => {
  try {
    // if (token) {
    //   const { body } = await apiRoot
    //     .me()
    //     .activeCart()
    //     .get({ Authorization: { token: `Bearer ${token}` }, headers:{token: `Bearer ${token}`} })
    //     .execute();
    //   console.log(
    //     "🚀 ~ file: ct.cart.services.js:117 ~ getLineItems ~ body:",
    //     body
    //   );
    //   return body;
    // }
    const { body } = await adminApiRoot
      .carts()
      .withId({ ID: cart_id })
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
      anonymousId: body.anonymousId,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: ct.cart.services.js:141 ~ deleteLineItem ~ error:",
      error
    );
  }
};

/**
 * To update line item quantity
 *
 * @param {{cart_id:String, version:Int, lineItem_id:String}}
 */
const updateLineItemQty = async ({
  cart_id,
  version,
  lineItem_id,
  quantity,
}) => {
  try {
    const { body } = await adminApiRoot
      .carts()
      .withId({ ID: cart_id })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "changeLineItemQuantity",
              lineItemId: lineItem_id,
              quantity: quantity,
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
      anonymousId: body.anonymousId,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: ct.cart.services.js:141 ~ deleteLineItem ~ error:",
      error
    );
  }
};

/**
 * Link Customer email with the cart
 * @param {{email:String, cart_id:String, version:String}}
 */
const linkCustomerEmailToCart = async ({ cart_id, version, email }) => {
  try {
    const { body } = await adminApiRoot
      .carts()
      .withId({ ID: cart_id })
      .post({
        body: {
          version,
          actions: [
            {
              action: "setCustomerEmail",
              email,
            },
          ],
        },
      })
      .execute();
    console.log("🚀 ~ file: ct.cart.services.js:250 ~ data:", body);
    return body;
  } catch (error) {
    console.log(
      "🚀 ~ file: ct.cart.services.js:240 ~ linkCustomerEmailToCart ~ error:",
      error
    );
  }
};

/**
 * Update Shipping Address to Cart
 * @param {{cart_id, version, building,city,country,email,firstName,lastName,mobile,postCode,salutation,state,streetName}}
 */
const addShippingAddress = async ({
  cart_id,
  version,
  building,
  city,
  country,
  email,
  firstName,
  lastName,
  mobile,
  postalCode,
  salutation,
  state,
  streetName,
}) => {
  try {
    const { body } = await adminApiRoot
      .carts()
      .withId({ ID: cart_id })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "setShippingAddress",
              address: {
                salutation,
                firstName,
                lastName,
                email,
                mobile,
                building,
                streetName,
                city,
                postalCode,
                // state,
                country,
              },
            },
          ],
        },
      })
      .execute();
    console.log("🚀 ~ file: ct.cart.services.js:261 ~ body:", body);
    return body;
  } catch (error) {
    console.log("🚀 ~ file: ct.cart.services.js:264 ~ error:", error);
    throw error;
  }
};

/**
 * Update Billing Address to Cart
 * @param {{cart_id, version, building,city,country,email,firstName,lastName,mobile,postCode,salutation,state,streetName}}
 */
const addBillingAddress = async ({
  cart_id,
  version,
  building,
  city,
  country,
  email,
  firstName,
  lastName,
  mobile,
  postalCode,
  salutation,
  state,
  streetName,
}) => {
  try {
    const { body } = await adminApiRoot
      .carts()
      .withId({ ID: cart_id })
      .post({
        body: {
          version,
          actions: [
            {
              action: "setBillingAddress",
              address: {
                salutation,
                firstName,
                lastName,
                email,
                mobile,
                building,
                streetName,
                city,
                postalCode,
                // state,
                country,
              },
            },
          ],
        },
      })
      .execute();
    console.log("🚀 ~ file: ct.cart.services.js:261 ~ body:", body);
    return body;
  } catch (error) {
    console.log("🚀 ~ file: ct.cart.services.js:264 ~ error:", error);
    throw error;
  }
};

/**
 * Add Shipping Method to cart based on Shipping Method ID
 *
 * @param {{ cart_id:String, version:Int, method_id:String }}
 *
 */
const addShippingMethod = async ({ cart_id, version, method_id }) => {
  try {
    const { body } = await adminApiRoot
      .carts()
      .withId({ ID: cart_id })
      .post({
        body: {
          version,
          actions: [
            {
              action: "setShippingMethod",
              shippingMethod: {
                id: method_id,
                typeId: "shipping-method",
              },
            },
          ],
        },
      })
      .execute();
    return body;
  } catch (error) {
    console.log(
      "🚀 ~ file: ct.cart.services.js:301 ~ addShippingMethod ~ error:",
      error
    );
    throw error;
  }
};

/**
 * To Place Order & generate order id
 * @param {{ cart_id:String, version:Int }}
 */
const createOrder = async ({ cart_id, version }) => {
  try {
    const orderNumber = crypto.randomInt(10 ** 7, 10 ** 10 - 1);
    // const orderNumber = crypto
    //   .randomInt(0, 10 ** 8 - 1)
    //   .toString()
    //   .padStart(8, "0");
    console.log(
      "🚀 ~ file: ct.cart.services.js:387 ~ createOrder ~ orderNumber:",
      orderNumber
    );
    const { body } = await adminApiRoot
      .orders()
      .post({
        body: {
          version,
          cart: {
            id: cart_id,
            typeId: "cart",
          },
          orderNumber: `CT${orderNumber}`,
        },
      })
      .execute();
    console.log(
      "🚀 ~ file: ct.cart.services.js:378 ~ createOrder ~ body:",
      body
    );
    return body;
  } catch (error) {
    console.log(
      "🚀 ~ file: ct.cart.services.js:380 ~ createOrder ~ error:",
      error
    );
    return error;
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

// deleteCartById("151d3a18-3c10-4f6a-88e3-928f60379a9c", 55);

module.exports = {
  createNewCart,
  addProductToCart,
  getLineItems,
  deleteLineItem,
  updateLineItemQty,
  addShippingAddress,
  addShippingMethod,
  addBillingAddress,
  createOrder,
  linkCustomerEmailToCart,
};
