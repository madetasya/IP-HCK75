const { verifyToken } = require("../helpers/jwt")
const { User } = require(`../models`)

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      throw { name: "Unauthorized" }
    }

    const [bearer, access_token] = authorization.split(" ")
    const { id } = verifyToken(access_token)

    const findUser = await User.findByPk(id)

    if (!findUser) {
      throw { name: "Unauthorized" }
    }

    req.user = {
      id: findUser.id,
      role: findUser.role
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication
