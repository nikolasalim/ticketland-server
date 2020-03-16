const { Router } = require("express");
const Ticket = require("./model");

const router = new Router();

router.post("/ticket", (req, res, next) => {
  const ticket = {
    picture: req.body.picture,
    price: req.body.price,
    description: req.body.description
  };

  Ticket.create(ticket)
    .then(ticket => {
      res.json(ticket);
    })
    .catch(next);
});

module.exports = router;
