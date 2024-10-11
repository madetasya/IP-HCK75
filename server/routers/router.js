const express = require("express");
const router = express.Router();
const errorHandler = require("../middleware/errors");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const UserController = require("../controllers/UserController.js");
const ArticleController = require("../controllers/ArticleController.js");
const gemini =require("../controllers/GeminiController.js")

//API GANG
const NewsApiController = require("../controllers/NewsApiController.js");
router.get("/news/natural-disasters", NewsApiController.getNaturalDisasterNews);

//gemini
router.post("/gemini",async (req,res,next) => {
    try {
        const {location}=req.body
        let ai = await gemini(location)
        res.status(200).json(ai)
    } catch (error) {
        console.log(error);
        next(error)
        
    }
})

//Register & Login
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/auth/google", UserController.googleLogin);

//Article Controller
router.get("/article", ArticleController.getAllArticle);
router.get("/article/:id", ArticleController.getArticleById);
// router.use(authorization);
// router.use(authentication);
router.post("/article", ArticleController.createArticle);
router.put("/article/:id", ArticleController.updatePostById);
router.delete("/article/:id", ArticleController.deleteArticleById);

router.use(errorHandler);

module.exports = router;
