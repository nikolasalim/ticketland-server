const { Router } = require("express");
const Event = require("./model");
const { Op } = require("sequelize");
const auth = require("../auth/middleware");
const User = require("../user/model");
const Ticket = require("../ticket/router");

const router = new Router();

// Reading all events then paginating – max 9 per page

router.get("/event", (req, res, next) => {
  const limit = req.query.limit || 2;
  const offset = req.query.offset || 0;

  const now = new Date();

  console.log("now is:", now);

  Event.findAndCountAll({
    limit,
    offset,
    where: {
      end_date: {
        [Op.gte]: now
      }
    },
    order: [["updatedAt", "DESC"]]
  })
    .then(events => {
      events.count === 0
        ? res.status(404).send("No movies were found. Try again later.")
        : res.send({ list: events.rows, total: events.count });
    })
    .catch(next);
});

// Reading a specific event

router.get("/event/:eventId", (req, res, next) => {
  Event.findByPk(req.params.eventId /* , { include: [User] } */)
    .then(event => {
      !event
        ? res.status(404).send("Event not found. Please, try again.")
        : res.json(event);
    })
    .catch(next);
});

// Creating an event

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

// const now = new Date();
// console.log("now is:", now);
// console.log("events is:", events);
// console.log(
//   "events.rows:",
//   events.rows.map(event => event.dataValues.end_date)
// );
// console.log("is now < end_date?", now < events.end_date);

//////////////////////////////////////////

// const startIndex = (page - 1) * limit;
// const endIndex = page * limit;

// const startIndex = 0;
// const endIndex = 2;

// const list = {};

// list.next = {
//   page: page + 1,
//   limit: limit
// };

// list.previous = {
//   page: page - 1,
//   limit: limit
// };

// console.log("list is:", list);

// Event.findAndCountAll(
//   /* { order: [["updatedAt", "DESC"]] }, */ { limit, offset }
// )
//   .then(events => {
//     console.log("events is:", events);
//     events.count === 0
//       ? res.status(404).send("No movies were found. Try again later.")
//       : events.rows.slice(startIndex, endIndex);
//     res.send(events);
//     // res.send({ list: events.rows, total: events.count });
//   })
//   .catch(next);
