require("dotenv").config();
const express = require("express");
const app = express();

const router = require("./routers/router");
const cors = require("cors");
const errorHandler = require("./middleware/errors");

app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST",
//     allowedHeaders: "Content-Type, Authorization",
//   })
// );
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

module.exports = app;
