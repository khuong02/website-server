const models = require("../models/main.models");

const CalcStatistical = async (req, res, next) => {
  try {
    const statistical = await models.technologyPage.find();
    const percent = {};

    const totalQuantity = statistical.reduce((result, num) => {
      return (result += +num.quantity);
    }, 0);

    if (!statistical)
      return res.status(400).json({ msg: "Database is not connect." });

    statistical.map((item) => {
      return (percent[item.country] =
        ((+item.quantity * 100) / totalQuantity).toFixed(2) + "%");
    });

    const fiveLarge = statistical
      .sort((a, b) => {
        return b.quantity - a.quantity;
      })
      .filter((item, index) => index < 5);

    const changeKeyData = statistical.map((i) => {
      return JSON.parse(JSON.stringify(i).replace("quantity", "value"));
    });

    res.result = {
      statistical,
      totalQuantity,
      percent,
      fiveLarge,
      changeKeyData,
    };

    next();
  } catch (err) {
    res.status(450).json({ msg: err.message });
  }
};

module.exports = CalcStatistical;
