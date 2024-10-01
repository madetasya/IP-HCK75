const express = require("express");
const router = express.Router();
const errorHandler = require("../middleware/errors");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");


//Category Controller === Support
router.get("/news", );
router.post("/news", );
router.put("/news/:id", );
router.delete("/categories/:id", );

router.use(errorHandler);
module.exports = router;
