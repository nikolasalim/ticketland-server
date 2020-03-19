const Sequelize = require("sequelize");
const db = require("../db");

const Event = require("../event/model");
const Ticket = require("../ticket/model");
const Comment = require("../comment/model");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Event.belongsTo(User);
User.hasMany(Event);

Ticket.belongsTo(Event);
Event.hasMany(Ticket);

Ticket.belongsTo(User);
User.hasMany(Ticket);

Comment.belongsTo(Ticket);
Ticket.hasMany(Comment);

Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = User;
