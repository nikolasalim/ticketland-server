const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: false
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = Event;
