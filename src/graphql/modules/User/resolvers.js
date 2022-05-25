const db = require("../../../db");

function geradorId(list) {
  let newId;
  let last = list[list.length - 1];
  if (!last) {
    newId = 0;
  } else {
    newId = last.id;
  }
}

module.exports = {
  User: {
    profile(user) {
      return db.profiles.find((profile) => profile.id === user.profile);
    },
  },
  Query: {
    user(_, args) {
      return db.users.find((db) => db.id === args.id);
    },
    users: () => db.users,
  },
  Mutation: {
    createUser(_, { data }) {
      const { email } = data;

      const userExists = db.users.some((user) => user.email === email);
      if (userExists) {
        throw new Error(`Usuario Existente: ${data.name}`);
      }
      const newUser = {
        ...data,
        id: geradorId(db.users),
        profile_id: 2,
      };
      db.users.push(newUser);
      return newUser;
    },
    updateUser(_, { id, data }) {
      const user = db.users.find((user) => user.id === id);
      const indice = db.users.findIndex((user) => user.id === id);

      const newUser = {
        ...user,
        ...data,
      };
      db.users.splice(indece, 1, newUser);

      return newUser;
    },
  },
};
