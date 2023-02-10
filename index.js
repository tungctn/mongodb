const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const appRoute = require("./router/index");
const cors = require("cors");

const corsOptions = {
  //To allow requests from client
  origin: [
    "http://localhost:3000/",
    "https://jellyfish-app-8ib89.ondigitalocean.app",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://jellyfish-app-8ib89.ondigitalocean.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
