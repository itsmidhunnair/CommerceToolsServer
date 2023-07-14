const { ctpClient, ctpAdminClient } = require("./buildClient");

const {
  ApiRoot,
  createApiBuilderFromCtpClient,
} = require("@commercetools/platform-sdk");

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY,
});

const adminApiRoot = createApiBuilderFromCtpClient(
  ctpAdminClient
).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY,
});

module.exports = { apiRoot, adminApiRoot };
