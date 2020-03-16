const { Router } = require("express");
const Event = require("./model");

const router = new Router();

router.post("/event", (req, res, next) => {
  const event = {
    name: req.body.name,
    description: req.body.description,
    picture: req.body.picture,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  };

  Event.create(event)
    .then(event => {
      res.json(event);
    })
    .catch(next);
});

module.exports = router;
