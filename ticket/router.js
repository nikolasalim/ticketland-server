const { Router } = require("express");
const auth = require("../auth/middleware");
const Ticket = require("./model");
const Event = require("../event/model");

const router = new Router();

router.post("/ticket", auth, (req, res, next) => {
  const ticket = {
    image: req.body.image,
    price: req.body.price,
    description: req.body.description,
    //HARDCODED FOR NOW:
    eventId: req.body.eventId,
    userId: req.user.dataValues.id
  };

  Ticket.create(ticket)
    .then(ticket => {
      res.json(ticket);
    })
    .catch(next);
});

router.get("/ticket/:ticketId", (req, res, next) => {
  Ticket.findByPk(req.params.ticketId, { include: [Event] })
    .then(event => {
      res.json(event);
    })
    .catch(next);
});

module.exports = router;
