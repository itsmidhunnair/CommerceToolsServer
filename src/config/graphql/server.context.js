const cookie = require("cookie");
const { cookieConfig } = require("../../constants/cookie.config");

const graphqlContext = async ({ req, res }) => {
  if (req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    console.log(
      "🚀 ~ file: server.context.js:7 ~ graphqlContext ~ cookies:",
      req.headers.cookie
    );

    return {
      token: cookies.token,
      cookies: cookies,
      req,
      res,
    };
  }
  return {
    req,
    res,
  };
};

module.exports = { graphqlContext };
