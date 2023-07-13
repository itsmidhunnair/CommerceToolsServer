const apiRoot = require("../../config/commercetools/clientApiRoot");

/**
 * Create a users cart
 *
 * todo check this
 *
 * @param {String} [auth_token]
 * @param {String} [auth_token]
 */
const createCart = async ({ auth_token = null, prod_id = null }) => {
    try {
      
    if (auth_token && prod_id) {
      // todo create cart and add product
    }
        
    // todo create anonymous id using uuid

    const data = apiRoot
      .carts()
      .post({
        body: {
          currency: "EUR",
          anonymousId: "",
        },
      })
      .execute();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
