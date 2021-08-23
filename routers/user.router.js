const router = require("express").Router();
const userCrl = require("../controller/user.controller");

router.post("/login", userCrl.login);

router.post("/register", userCrl.register);

router.get("/admin", userCrl.getAdmin);

module.exports = router;
