const { Router } = require("express");
const Comment = require("./model");
const auth = require("../auth/middleware");

const router = new Router();

router.get("/comment", (req, res, next) => {
  Comment.findAll({ order: [["updatedAt", "DESC"]] })
    .then(comment => res.json(comment))
    .catch(next);
});

router.post("/comment", auth, (req, res, next) => {
  // console.log("req body is:", req.body);
  // console.log("req user is:", req.user);
  const comm = {
    comment: req.body.comment,
    // imageId: req.body.imageId, // this will be ticket id
    whoCommented: req.user.dataValues.email
    // userId: req.user.dataValues.id // maybe won't need this
  };
  Comment.create(comm)
    .then(c => res.json(c))
    .catch(next);
});

module.exports = router;
