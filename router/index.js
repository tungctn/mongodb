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
    "clusters": [{ "key": "0", "color": "#6c3e81", "clusterLabel": "All nodes" }],
    "tags": [
      { "key": "ORG", "image": "organization.svg" },
      { "key": "PER", "image": "person.svg" },
      { "key": "LOC", "image": "unknown.svg" },
      { "key": "MISC", "image": "unknown.svg" }
    ]
  });
  // return res.status(200).json(
  //   {
  //     "nodes": [
  //       {
  //         "key": "1",
  //         "label": "Phạm Minh Chính",
  //         "tag": "PER",
  //         "cluster": "0",
  //         "score": 1
  //       },
  //       {
  //         "key": "2",
  //         "label": "Nguyễn Xuân Phúc",
  //         "tag": "PER",
  //         "cluster": "0",
  //         "score": 0.8
  //       },
  //       {
  //         "key": "3",
  //         "label": "Nguyễn Phú Trọng",
  //         "tag": "PER",
  //         "cluster": "0",
  //         "score": 0.1
  //       }
  //     ],
  //   "edges": [
  //     {
  //       "key": "0",
  //       "source": "1",
  //       "target": "2",
  //       "size": 3,
  //       "articles": [
  //         {
  //           "key": "1",
  //           "title": "Phạm Minh Chính: Tôi không có mối quan hệ gì với Nguyễn Xuân Phúc",
  //           "url": "https://vnexpress.net/pham-minh-chinh-toi-khong-co-moi-quan-he-gi-voi-nguyen-xuan-phuc-4200001.html",
  //           "date": "2020-07-01"
  //         }
  //       ]
  //     },
  //     {
  //       "key": "1",
  //       "source": "1",
  //       "target": "3",
  //       "size": 1,
  //       "articles": [
  //         {
  //           "key": "2",
  //           "title": "Phạm Minh Chính: Tôi không có mối quan hệ gì với Nguyễn Xuân Phúc",
  //           "url": "https://vnexpress.net/pham-minh-chinh-toi-khong-co-moi-quan-he-gi-voi-nguyen-xuan-phuc-4200001.html",
  //           "date": "2020-07-01"
  //         }
  //       ]
  //     },
  //     {
  //       "key": "2",
  //       "source": "2",
  //       "target": "3",
  //       "size": 1,
  //       "articles": [
  //         {
  //           "key": "3",
  //           "title": "Phạm Minh Chính: Tôi không có mối quan hệ gì với Nguyễn Xuân Phúc",
  //           "url": "https://vnexpress.net/pham-minh-chinh-toi-khong-co-moi-quan-he-gi-voi-nguyen-xuan-phuc-4200001.html",
  //           "date": "2020-07-01"
  //         }
  //       ]
  //     }
  //   ],
  //   "clusters": [{ "key": "0", "color": "#6c3e81", "clusterLabel": "All nodes" }],
  //   "tags": [
  //     { "key": "ORG", "image": "organization.svg" },
  //     { "key": "PER", "image": "person.svg" },
  //     { "key": "LOC", "image": "unknown.svg" }
  //   ]
  // })
});

appRoute.post("/node", NodeController.createNode);
appRoute.post("/article", ArticleController.createArticle);
appRoute.post("/edge", EdgeController.createEdge);

module.exports = appRoute;
