const { gql, ApolloServer } = require("apollo-server");

const db = [
  {
    id: 1,
    email: "cintia@email.com",
    name: "Cintia",
    phone: " 12 334 566",
    profile: 1,
  },
  {
    id: 2,
    email: "antonella@email.com",
    name: "Antonella",
    phone: "123 345 996",
    profile: 2,
  },
];

const profiles = [
  {
    id: 1,
    description: "ADMIN",
  },
  {
    id: 2,
    description: "USER",
  },
];

const typeDefs = gql`
  type User {
    phone: String
    name: String
    email: String
    id: ID
    profile: Profile
  }
  type Profile {
    id: Int
    description: String
  }
  type Query {
    user(id: Int): User
    profiles: [Profile]
  }
`;

const resolvers = {
  User: {
    profile(user) {
      return profiles.find((profile) => profile.id === user.profile);
    },
  },
  Query: {
    user(_, args) {
      return db.find((db) => db.id === args.id);
    },
    profiles() {
      return profiles;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen();
