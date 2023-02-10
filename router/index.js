const express = require("express");
const appRoute = express();
const NodeController = require("../controller/NodeController");
const ArticleController = require("../controller/ArticleController");
const EdgeController = require("../controller/EdgeController");
const DayController = require("../controller/DayController");

const Node = require("../model/Node");
const Edge = require("../model/Edge");
const Day = require("../model/Day");

appRoute.get("/", async (req, res) => {
  let nodes = await Node.find();
  let edges = await Edge.find();
  let days = await Day.find();
  const date = days[days.length - 1];
  nodes = nodes
    .filter((node) => {
      if (
        new Date(node.createdAt) >= new Date(date.date.start) &&
        new Date(node.createdAt) <= new Date(date.date.end)
      ) {
        return node;
      }
    })
    .map((node) => {
      return {
        key: node._id,
        label: node.name,
        tag: node.type,
        cluster: node.cluster,
        score: node.score,
      };
    });
  edges = edges
    .filter((edge) => {
      if (
        new Date(edge.createdAt) >= new Date(date.date.start) &&
        new Date(edge.createdAt) <= new Date(date.date.end)
      ) {
        return edge;
      }
    })
    .map((edge) => {
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
    clusters: [{ key: "0", color: "#6c3e81", clusterLabel: "All nodes" }],
    tags: [
      { key: "ORG", image: "organization.svg" },
      { key: "PER", image: "person.svg" },
      { key: "LOC", image: "unknown.svg" },
      { key: "MISC", image: "unknown.svg" },
    ],
  });
});

appRoute.get("/csv/node", NodeController.getAllNodesInCSV);
appRoute.get("/csv/edge", EdgeController.getAllEdgesInCSV);

appRoute.post("/node", NodeController.createNode);
appRoute.post("/article", ArticleController.createArticle);
appRoute.post("/edge", EdgeController.createEdge);
appRoute.post("/daystart", DayController.createDayStart);
appRoute.post("/dayend", DayController.createDayEnd);
appRoute.post("/day", DayController.createDay);

module.exports = appRoute;
