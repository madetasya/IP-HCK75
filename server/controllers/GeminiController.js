const getDisasterSlogan = require("../helpers/gemini");

class Gemini {
  static async gemini(req, res, next) {
    try {
      const slogan = await getDisasterSlogan();
      res.status(200).json({ slogan });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Gemini;
