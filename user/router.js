const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");

const router = new Router();

router.post("/user", (req, res, next) => {
  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  };

  User.create(user)
    .then(user => {
      // res.json(user);
      res.send({
        jwt: toJWT({ userId: user.id }),
        userId: user.id
      });
    })
    .catch(next);
});

module.exports = router;
