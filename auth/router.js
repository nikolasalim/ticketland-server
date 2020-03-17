const { Router } = require("express");
const User = require("../user/model");
const bcrypt = require("bcrypt");
const { toJWT, toData } = require("./jwt");
const auth = require("./middleware");

const router = new Router();

router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res
      .status(400)
      .send({
        message: "Please supply a valid username and password"
      })
      .catch(next);
  } else {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: "User with that username does not exist"
          });
        } else if (bcrypt.compareSync(req.body.password, entity.password)) {
          res.send({
            jwt: toJWT({ userId: entity.id }),
            userId: entity.id
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong"
        });
      });
  }
});

module.exports = router;
