const { default: sdkAuth } = require("@commercetools/sdk-auth");
const fetch = require("node-fetch");

const authClient = new sdkAuth({
  host: process.env.CTP_AUTH_URL,
  projectKey: process.env.CTP_PROJECT_KEY,
  disableRefreshToken: false,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID,
    clientSecret: process.env.CTP_CLIENT_SECRET,
  },
  scopes: [`${process.env.CTP_SCOPES}`],
  fetch,
});

module.exports = { authClient };
