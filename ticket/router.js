const { Router } = require("express");
const auth = require("../auth/middleware");
const Ticket = require("./model");
const Event = require("../event/model");
const Comment = require("../comment/model");
const riskAlgorithm = require("../ticket/riskAlgorithm");
const router = new Router();

// Creating a ticket:

router.post("/ticket", auth, (req, res, next) => {
  const ticket = {
    image: req.body.image,
    price: req.body.price,
    description: req.body.description,
    author: req.user.dataValues.username,
    eventId: req.body.eventId,
    userId: req.user.dataValues.id,
  };

  Ticket.create(ticket)
    .then((ticket) => {
      res.json(ticket);
    })
    .catch(next);
});

// Reading all tickets:

router.get("/ticket", (req, res, next) => {
  Ticket.findAll({ include: [Event] })
    .then((tickets) => {
      res.json(tickets);
    })
    .catch(next);
});

// Reading a specific ticket:

// router.get("/ticket/:ticketId", (req, res, next) => {
//   Ticket.findByPk(req.params.ticketId, {
//     include: [{ model: Event }, { model: Comment }],
//   })
//     .then((ticket) => {
//       // console.log("Ticket is", ticket);
//       console.log(
//         "number of comments is:",
//         ticket.comments.length
//         // ticket.comments.map((comment) => comment.comment)
//       );
//       res.json(ticket);
//     })
//     .catch(next);
// });

router.get("/ticket/:ticketId", async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.ticketId, {
      include: [{ model: Event }, { model: Comment }],
    });

    const allTickets = await Ticket.findAll();

    const ticketUpdated = await riskAlgorithm(allTickets, ticket);

    res.json(ticket);
  } catch (error) {
    next(error);
  }
});

// Updating a specific ticket:
/// add middleware

router.put("/ticket/:ticketId", (req, res, next) => {
  Ticket.findByPk(req.params.ticketId)
    .then((ticket) => ticket.update(req.body))
    .then((ticket) => res.json(ticket))
    .catch(next);
});

module.exports = router;
