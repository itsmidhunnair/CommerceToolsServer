const { ApolloServer } = require("@apollo/server");

// For express middleware
const express = require("express");

// All the request will be first redirected to App
const http = require("http");
// For configuring cors
const cors = require("cors");

const { expressMiddleware } = require("@apollo/server/express4");

// const { startStandaloneServer } = require("@apollo/server/standalone");

const dotenv = require("dotenv").config();
const { resolvers } = require("./src/resolver");
const { typeDefs } = require("./src/schema/typeDef");

// ---------------- GQL Standalone Server Initiate (Custom CORS and Cookie not supported) ----------------

// const server = new ApolloServer({ typeDefs, resolvers });

// const startServer = async () => {
//   const { url } = await startStandaloneServer(server);
//   console.log(`Server Started on ${url}`);
// };

// startServer();

// ---------------- GQL Standalone Server ---------------------------------------------------------

// ---------------- GQL Server with Express middleware ----------------------------------------
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();

  app.use(
    "/",
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        token: req.headers?.cookie?.split("=")[1],
        res,
      }),
    })
  );

  await new Promise((resolve) => {
    httpServer.listen({ port: 4000 }, resolve);
  });
  console.log(`Server Started on http://localhost:${4000}`);
};

startServer();

// ---------------- GQL Server with Express middleware ----------------------------------------
