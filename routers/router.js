const express = require("express");
const router = express.Router();
// const errorHandler = require("../middleware/errors");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const UserController = require("../controllers/UserController.js");

//Register & Login
router.post("/register", UserController.register)
router.post("/login",UserController.login)

//Category Controller === Support
router.get("/news", );
router.post("/news", );
router.put("/news/:id", );
router.delete("/news/:id", );

// router.use(errorHandler);

module.exports = router;
