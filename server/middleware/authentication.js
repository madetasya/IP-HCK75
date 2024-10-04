const { verifyToken } = require("../helpers/jwt");
const { User } = require(`../models`);

const authentication = async (req, res, next) => {
  try {
    // console.log(authorization, "ASASASAS");
    console.log("masuk sini?");
    const { authorization } = req.headers;

    if (!authorization) {
      throw { name: "Unauthorized" };
    }

    const [bearer, access_token] = authorization.split(" ");

    const { id } = verifyToken(access_token);

    const findUser = await User.findByPk(id);

    req.user = {
      id: findUser.id,
      role: findUser.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
