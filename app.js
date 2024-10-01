const express = require("express");
const app = express();
const port = process.env.port || 3000;

const router = require("./routers/router");
const errorHandler = require("./middleware/errors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log("==========WORK");
});
module.exports = app;
