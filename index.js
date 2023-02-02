const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const appRoute = require("./router/index");

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", appRoute);

mongoose.connect(process.env.MONGDB_URL, () => {
  console.log("connect to mongoose db");
});

app.listen(3001, () => {
  console.log("Express app listening on port 3001");
});
