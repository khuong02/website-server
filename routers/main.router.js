const router = require("express").Router();
const controller = require("../controller/main.controller");
const middleware = require("../middleware/main.middleware");
const pagination = require("../middleware/show.paginated");
const models = require("../models/main.models");

router.get("/technology", middleware, controller.technology);

// router.get(
//   "/technology_pagination",
//   pagination(models.technologyPage),
//   controller.paginated
// );

router.get("/show-room", pagination(models.showRoomPage), controller.paginated);

router.get("/about", controller.about);

router.get("/contact", controller.contact);

module.exports = router;
