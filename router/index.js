const express = require("express");
const appRoute = express();
const NodeController = require("../controller/NodeController");
const ArticleController = require("../controller/ArticleController");
const EdgeController = require("../controller/EdgeController");

const Node = require("../model/Node");
const Edge = require("../model/Edge");

appRoute.get("/", async (req, res) => {
  let nodes = await Node.find();
  let edges = await Edge.find();
  nodes = nodes.map((node) => {
    return {
      key: node._id,
      name: node.name,
      type: node.type,
      cluster: node.cluster,
      score: node.score,
    };
  });
  edges = edges.map((edge) => {
    return {
      key: edge._id,
      source: edge.source,
      target: edge.target,
      size: edge.size,
      articles: edge.articles.map((article) => {
        return {
          key: article._id,
          title: article.title,
          url: article.url,
          date: article.pubDate,
        };
      }),
    };
  });
  return res.status(200).json({
    nodes: nodes,
    edges: edges,
    cluster: [
      {
        key: "0",
        color: "#6c3e81",
        clusterLabel: "Other entities",
      }
    ],
    tags: [
      {
        key: "PER",
        image: "person.svg",
      },
      {
        key: "ORG",
        image: "organization.svg",
      },
      {
        key: "LOC",
        image: "unknown.svg",
      },
    ]
  });
});

appRoute.post("/node", NodeController.createNode);
appRoute.post("/article", ArticleController.createArticle);
appRoute.post("/edge", EdgeController.createEdge);

module.exports = appRoute;
