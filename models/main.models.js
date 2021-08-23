const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const showSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 1,
  },
  height: {
    type: Number,
    default: 1,
  },
});

const aboutSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const contactSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const technologyPage = mongoose.model(
  "TechnologyPage",
  productSchema,
  "technology"
);

const showRoomPage = mongoose.model("ShowRoomPage", showSchema, "showRoom");

const aboutPage = mongoose.model("AboutPage", aboutSchema, "about");

const contactPage = mongoose.model("ContactPage", contactSchema, "contact");

const Models = {
  technologyPage,
  showRoomPage,
  aboutPage,
  contactPage,
};

module.exports = Models;
