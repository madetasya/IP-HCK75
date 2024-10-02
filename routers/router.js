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

//Category Controller  
router.get("/news",ArticleController);
router.post("/news", authorization,ArticleController );
router.put("/news/:id", );
router.delete("/news/:id", );

router.use(errorHandler);

module.exports = router;
