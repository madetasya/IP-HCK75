const { Article } = require("../models");

async function authorization(req, res, next) {
  try {
    if (req.user.role === "Admin") {
      console.log(req.user, "===");
      next();
    }
    else{
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;

