const db = require("../../../db");
module.exports = {
  Query: {
    profiles() {
      return db.profiles;
    },
  },
};
