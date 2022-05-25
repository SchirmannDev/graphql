const { ApolloServer } = require("apollo-server");

const graphql = require("./src/graphql");

const server = new ApolloServer({
  ...graphql,
  formatError: (error) => {
    if (error.message.startsWith("Usuario Existente:")) {
      return new Error(error.message);
    }
  },
});

server.listen().then(({ url }) => console.log("Server running on " + url));
