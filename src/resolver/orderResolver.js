const {
  getUserDetails,
} = require("../services/commercetools/ct.auth.services");
const {
  getOrdersByEmailAndAddUid,
} = require("../services/commercetools/ct.order.services");

const orderResolver = {
  /**
   * To Get Orders linked with account
   *
   */
  fetchOrders: async (parent, args, { token }) => {
    try {
      const { email, userId } = await getUserDetails({ auth_token: token });
      const data = await getOrdersByEmailAndAddUid({ email, userId });
      console.log(
        "🚀 ~ file: orderResolver.js:13 ~ fetchOrders: ~ data:",
        data
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

module.exports = { orderResolver };
