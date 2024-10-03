const gemai = require("../helpers/gemini")
class Gemini{
    static async gemini(req,res,next){
        try {
            let data = await gemai()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Gemini