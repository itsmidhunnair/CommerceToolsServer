const cookie = require("cookie");

const graphqlContext = async ({ req, res }) => {
  if (req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    return {
      token: cookies.token,
      req: cookies,
      res,
    };
  }
};

module.exports = { graphqlContext };
