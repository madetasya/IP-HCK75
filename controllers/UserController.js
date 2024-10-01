const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

class UserController {
    static async register(req, res, next) {
        try {

            let { userName, email, password } = req.body
            let user = await User.create({ userName, email, password })

            res.status(201).json({
                id: user.id,
                userName: user.userName,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next) {
        let { email, password } = req.body
        try {
            if (!email || !password) {
                throw { name: "InvalidInput" }
            }

            const user = await User.findOne({
                where: { email }
            })

            if (!user || !comparePass(password, user.password)) {
                throw { name: "InvalidUser" }
            }

            const token = signToken({
                id: user.id
            })
            res.status(200).json({ access_token: token })

        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        const { googleToken } = req.body;
        try {
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID,

            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    picture: payload.picture,
                    provider: 'google',
                    password: 'google_id'
                },
                hooks: false
            });

            const token = signToken({ id: user.id }, process.env.JWT_SECRET);
            res.status(created ? 201 : 200).json({ access_token: token });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController