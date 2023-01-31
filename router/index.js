const express = require("express");
const appRoute = express();
const NodeController = require("../controller/NodeController");
const ArticleController = require("../controller/ArticleController");
const EdgeController = require("../controller/EdgeController");

appRoute.get("/", (req, res) => {
  res.send("Hello World!");
});

appRoute.post("/node", NodeController.createNode);
appRoute.post("/article", ArticleController.createArticle);
appRoute.post("/edge", EdgeController.createEdge);

module.exports = appRoute;
