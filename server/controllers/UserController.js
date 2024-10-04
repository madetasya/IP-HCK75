const { User } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    try {
      let { userName, email, password } = req.body;
      let user = await User.create({ userName, email, password });

      res.status(201).json({
        id: user.id,
        userName: user.userName,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    let { email, password } = req.body;
    try {
      if (!email || !password) {
        throw { name: "InvalidInput" };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user || !comparePass(password, user.password)) {
        throw { name: "InvalidUser" };
      }

      const token = signToken({
        id: user.id,
      });
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    const client = new OAuth2Client();
    try {
      // we receive googleToken from the client
      const { googleToken } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        // we use our client_id from the Google console
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email, name } = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email },
        hooks: false,
        defaults: {
          userName: name,
          email: email,
          password: "google_id",
        },
      });

      // const [user, created] = await User.findOrCreate(
      //   {
      //     where: { email: email },
      //     defaults: {
      //       name: name,
      //       email: email,
      //       // picture: payload.picture,
      //       // provider: "google",
      //       // We can type any password as a placeholder.
      //       // In future development, you should implement a feature to update the user's password.
      //       password: "google_id",
      //     },
      //     // Required to set hooks: false
      //   },
      //   {
      //     hooks: false,
      //   }
      // );
      console.log(user, "????????????????????????????");

      const token = signToken({ id: user.id });
      res.status(created ? 201 : 200).json({ access_token: token });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
