const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      throw { name: "unauthorized" }
    }

    const [bearer, access_token] = authorization.split(" ")

    const { id } = verifyToken(access_token)

    const findUser = await User.findByPk(id)

    if (!findUser) {
      throw { name: "unauthorized" }
    }

    req.user = {
      id: findUser.id
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication
