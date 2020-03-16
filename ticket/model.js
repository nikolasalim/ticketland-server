const Sequelize = require("sequelize");
const db = require("../db");

const Ticket = db.define("ticket", {
  picture: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = Ticket;
