const { Router } = require("express");
const auth = require("../auth/middleware");
const Comment = require("./model");
const Ticket = require("../ticket/model");

const router = new Router();

// Reading all comments:

router.get("/comment", (req, res, next) => {
  Comment.findAll({ include: [Ticket] }, { order: [["updatedAt", "DESC"]] })
    .then(comment => res.json(comment))
    .catch(next);
});

// Posting a comment:

router.post("/comment", auth, (req, res, next) => {
  const comm = {
    comment: req.body.comment,
    whoCommented: req.user.dataValues.username,
    ticketId: req.body.ticketId,
    userId: req.user.dataValues.id
  };
  Comment.create(comm)
    .then(c => res.json(c))
    .catch(next);
});

module.exports = router;
