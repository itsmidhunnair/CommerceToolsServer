const fetch = require("node-fetch");
const { ClientBuilder } = require("@commercetools/sdk-client-v2");
const dotenv = require("dotenv");

dotenv.config();

const projectKey = process.env.CTP_PROJECT_KEY;
const scopes = process.env.CTP_SCOPES.split(" ");

/**
 * Configure AuthMiddleware
 */
const authMiddlewareOptions = {
  host: process.env.CTP_AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID,
    clientSecret: process.env.CTP_CLIENT_SECRET,
  },
  scopes, //Scope is optional CT takes scope automatically from client id and secret
  fetch,
};

/**
 * Configure httpMiddlewareOptions
 */
const httpMiddlewareOptions = {
  host: process.env.CTP_API_URL,
  fetch,
};

/**
 * Export the ClientBuilder
 */
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

module.exports = ctpClient;
