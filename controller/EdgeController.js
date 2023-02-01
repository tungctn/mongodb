const Edge = require("../model/Edge");
const Node = require("../model/Node");
const Article = require("../model/Article");

function unique(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i].toString())) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

module.exports.createEdge = async (req, res) => {
  try {
    let arr_source = [];
    let arr_target = [];
    const listEdge = await Edge.find();
    for (const edge of listEdge) {
      arr_source.push(edge.source.toString());
      arr_target.push(edge.target.toString());
    }
    if (
      (arr_source.includes(req.body.source) &&
        arr_target.includes(req.body.target)) ||
      (arr_source.includes(req.body.target) &&
        arr_target.includes(req.body.source))
    ) {
      const edge = await Edge.findOne({
        source: req.body.source,
        target: req.body.target,
      });
      let articles = edge.articles.concat(req.body.articles);
      console.log(articles);
      articles = unique(articles);
      console.log(articles);
      edge.articles = articles;
      edge.size = articles.length;
      edge.save();
      return res.status(200).json({
        message: "Edge already exists",
      });
    } else {
      const edge = await new Edge({
        ...req.body,
      });
      edge.save();
    }
    res.status(200).json({
      message: "Edge created",
    });
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};

module.exports.createPattern = async (req, res) => {
  try {
    res.status(200).json();
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
