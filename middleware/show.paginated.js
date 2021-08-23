const paginated = (model) => {
  return async (req, res, next) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit;
    const { name } = req.query;

    const startIndex = (page - 1) * limit;

    if (
      (await model.countDocuments().exec()) === 0 ||
      !(await model.countDocuments().exec())
    )
      return res.status(400).json({ msg: "Not models in database." });

    const results = {};

    if (name) {
      results.pagination = {
        page,
        limit,
        totalPage: Math.ceil(
          (results.result = await model.find({
            country: { $regex: name, $options: "i" },
          })).length / limit
        ),
      };
    } else {
      results.pagination = {
        page,
        limit,
        totalPage: Math.ceil((await model.countDocuments().exec()) / limit),
      };
    }

    try {
      if (name) {
        results.result = await model
          .find({
            country: { $regex: name, $options: "i" },
          })
          .limit(limit)
          .skip(startIndex)
          .exec();
      } else {
        results.result = await model
          .find()
          .limit(limit)
          .skip(startIndex)
          .exec();
      }

      res.paginatedResults = results;
      next();
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
};

module.exports = paginated;
