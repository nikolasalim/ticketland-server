const { Router } = require("express");
const auth = require("../auth/middleware");
const Ticket = require("./model");
const Event = require("../event/model");

const router = new Router();

// Creating a ticket:

router.post("/ticket", auth, (req, res, next) => {
  const ticket = {
    image: req.body.image,
    price: req.body.price,
    description: req.body.description,
    author: req.user.dataValues.username,
    eventId: req.body.eventId,
    userId: req.user.dataValues.id
  };

  Ticket.create(ticket)
    .then(ticket => {
      res.json(ticket);
    })
    .catch(next);
});

// Reading all tickets:

router.get("/ticket", (req, res, next) => {
  Ticket.findAll({ include: [Event] })
    .then(tickets => {
      res.json(tickets);
    })
    .catch(next);
});

// Reading a specific ticket:

router.get("/ticket/:ticketId", (req, res, next) => {
  Ticket.findByPk(req.params.ticketId, { include: [Event] })
    .then(event => {
      res.json(event);
    })
    .catch(next);
});

// Updating a specific ticket:

router.put("/ticket/:ticketId", (req, res, next) => {
  Ticket.findByPk(req.params.ticketId)
    .then(ticket => ticket.update(req.body))
    .then(ticket => res.json(ticket))
    .catch(next);
});

module.exports = router;
