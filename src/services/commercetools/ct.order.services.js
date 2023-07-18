const { adminApiRoot } = require("../../config/commercetools/clientApiRoot");

/**
 * To
 */
const getOrdersByEmailAndAddUid = async ({ email, userId }) => {
  try {
    const { body } = await adminApiRoot
      .orders()
      .get({
        queryArgs: {
          where: `customerEmail="${email}"`,
        },
      })
      .execute();
    const data = body.results;
    const orders = data.filter((order) => {
      if (!("customerId" in order)) {
        return { id: order.id, version: order.version };
      }
    });
    if (orders.length > 0) {
      try {
        const result = await mergeUseridWithId(orders, userId);
      } catch (error) {
        throw error;
      }
    }
    return data;
    // data.filter((order) => order.customerId);
  } catch (error) {
    console.log(
      "🚀 ~ file: ct.order.services.js:21 ~ getOrdersByEmail ~ error:",
      error
    );
    return error;
  }
};

/**
 * Merge User id with
 */
const mergeUseridWithId = async (orders, userId) => {
  const data = await Promise.all(
    orders.map(async (order) => {
      const { body: orderDetails } = await adminApiRoot
        .orders()
        .withId({ ID: order.id })
        .post({
          body: {
            version: parseInt(order.version),
            actions: [
              {
                action: "setCustomerId",
                customerId: userId,
              },
            ],
          },
        })
        .execute();
      return orderDetails;
    })
  );
  return data;
};

// getOrdersByEmailAndAddUid({
//   email: "itsmidhunnair@gmail.com",
//   userId: "d12c4402-d257-48ff-8ea8-5a842490a9e2",
// });

module.exports = { getOrdersByEmailAndAddUid };
