const models = require("../models/main.models");

const controller = {
  technology: async (req, res) => {
    try {
      res.send({ success: true, data: res.result });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  showRoom: async (req, res) => {
    try {
      const data = await models.showRoomPage.find();

      if (!data || data.length === 0)
        return res.status(400).json({ msg: "Data of page is not already." });

      res.json({ success: true, data: data });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  paginated: async (req, res) => {
    try {
      res.json(res.paginatedResults);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  about: async (req, res) => {
    try {
      const aboutImg = await models.aboutPage.find({ name: "image-header" });

      if (!aboutImg)
        return res.status(400).json({ msg: "data is not already." });

      res.json(aboutImg);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  contact: async (req, res) => {
    try {
      const contactImg = await models.contactPage.find({
        name: "country",
      });

      if (!contactImg)
        return res.status(400).json({ msg: "data is not already." });

      res.json(contactImg);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = controller;
