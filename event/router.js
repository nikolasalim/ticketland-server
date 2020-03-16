const { Router } = require("express");
const Event = require("./model");
const auth = require("../auth/middleware");

const router = new Router();

router.get("/event", (req, res, next) => {
  const limit = 9;
  const offset = 0;

  Event.findAndCountAll({ order: [["updatedAt", "DESC"]] }, { limit, offset })
    .then(events => {
      events.count === 0
        ? res.status(404).send("No movies were found. Try again later.")
        : res.send({ list: events.rows, total: events.count });
    })
    .catch(next);
});

router.post("/event", auth, (req, res, next) => {
  const event = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    userId: req.user.dataValues.id
  };

  Event.create(event)
    .then(event => {
      res.json(event);
    })
    .catch(next);
});

module.exports = router;

// router.get("/event/:eventId", (req, res, next) => {
//   Event.findByPk(req.params.eventId, { include: [User] })
//     .then(event => {
//       !event
//         ? res.status(404).send("Event not found. Please, try again.")
//         : res.json(event);
//     })
//     .catch(next);
// });
