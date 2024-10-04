const express = require("express");
const router = express.Router();
const errorHandler = require("../middleware/errors");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const UserController = require("../controllers/UserController.js");
const ArticleController = require("../controllers/ArticleController.js");

//CORS
const cors = require('cors')
router.use(cors())


//API GANG
const Gemini = require("../controllers/GeminiController.js");
// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI(API_KEY);

// router.get('/top-news', async (req, res) => {
//   try {
//     const response = await newsapi.v2.topHeadlines({
//       q: 'trump',
//       category: 'politics',
//       language: 'en',
//       country: 'us'
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch news' });
//   }
// });


//Register & Login
router.post("/register", UserController.register)
router.post("/login",UserController.login)
router.post("/gemini",Gemini.gemini)
router.post("/auth/google", UserController.googleLogin);

//Article Controller  
router.get("/article",ArticleController.getAllArticle);
router.get("/article/:id",ArticleController.getArticleById);
// router.use(authentication);
// router.use(authorization);
router.post("/article",ArticleController.createArticle);
router.put("/article/:id",ArticleController.updatePostById );
router.delete("/article/:id",ArticleController.deleteArticleById);

router.use(errorHandler);

module.exports = router;
