const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/user.models");

router.get("/", verify, (req, res) => {
  User.findOne({ _id: req.user._id }).then((user) => {
    return res.json({
      ...req.user,
      name: user.name,
      avatar: user.avatar,
      role: user.role.toUpperCase(),
    });
  });
});

module.exports = router;
