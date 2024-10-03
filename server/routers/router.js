const express = require("express");
const router = express.Router();
const errorHandler = require("../middleware/errors");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const UserController = require("../controllers/UserController.js");
const ArticleController = require("../controllers/ArticleController.js");
const Gemini = require("../controllers/GeminiController.js");

//Register & Login
router.post("/register", UserController.register)
router.post("/login",UserController.login)

router.post("/gemini",Gemini.gemini)

//Article Controller  
router.get("/article",ArticleController.getAllArticle);
router.get("/article/:id",ArticleController.getArticleById);
router.use(authentication);
router.use(authorization);
router.post("/article",ArticleController.createArticle);
router.put("/article/:id",ArticleController.updatePostById );
router.delete("/article/:id",ArticleController.deleteArticleById);

router.use(errorHandler);

module.exports = router;
