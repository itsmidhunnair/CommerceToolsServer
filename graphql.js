const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { resolvers } = require("./src/resolver/resolver");
const { typeDefs } = require("./src/schema/typeDef");

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  const { url } = await startStandaloneServer(server);
  console.log(`Server Started on ${url}`);
};

startServer();
