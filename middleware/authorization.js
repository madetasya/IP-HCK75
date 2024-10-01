const { News } = require("../models");

async function authorization(req, res, next) {
  try {
    if (req.user.role === "Admin") {
      console.log(req.user);
      next();
    }

    const { id } = req.params;
    console.log(req.params);

    const news = await News.findByPk(id);
    console.log(news);

    if (!news) {
      throw { name: "NotFound" };
    }

    if (news.userId !== req.user.id) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;

