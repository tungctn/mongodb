const express = require("express");
const appRoute = express();
const NodeController = require("../controller/NodeController");

appRoute.get("/", (req, res) => {
  res.send("Hello World!");
});

appRoute.post("/node", NodeController.createNode);

module.exports = appRoute;