const express = require("express");
const router = express.Router();
const errorHandler = require("../middleware/errors");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const UserController = require("../controllers/UserController.js");
const ArticleController = require("../controllers/ArticleController.js");

//Register & Login
router.post("/register", UserController.register)
router.use(authentication);
router.post("/login",UserController.login)

//Article Controller  
router.get("/news",ArticleController);
router.post("/news", authorization,ArticleController );
router.put("/news/:id",authorization,ArticleController );
router.delete("/news/:id",authorization,ArticleController );

router.use(errorHandler);

module.exports = router;
