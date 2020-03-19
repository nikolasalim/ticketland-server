const { Router } = require("express");
const auth = require("../auth/middleware");
const Comment = require("./model");
const Ticket = require("../ticket/model");

const router = new Router();

router.get("/comment", (req, res, next) => {
  Comment.findAll({ include: [Ticket] }, { order: [["updatedAt", "DESC"]] })
    .then(comment => res.json(comment))
    .catch(next);
});

router.post("/comment", auth, (req, res, next) => {
  console.log("req body is:", req.body);
  // console.log("req user is:", req.user);
  const comm = {
    comment: req.body.comment,
    whoCommented: req.user.dataValues.username,
    ticketId: req.body.ticketId, // this will be ticket id
    userId: req.user.dataValues.id // maybe won't need this
  };
  Comment.create(comm)
    .then(c => res.json(c))
    .catch(next);
});

module.exports = router;
