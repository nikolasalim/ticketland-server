const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  comment: {
    type: Sequelize.TEXT
  },
  whoCommented: {
    type: Sequelize.STRING
  }
});

module.exports = Comment;
