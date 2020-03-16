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

//  Users
// 	Events – relationship: has user id
// 	Ticket – relationship: has event id & user id
// 	Comments – relationship: has user id & ticket id

// 	PS: Use include. Users will include events and tickets, etc.
