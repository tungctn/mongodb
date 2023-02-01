const Edge = require("../model/Edge");

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
      // Each element of edge.articles is an object, so we need to convert it to string
      let articles = edge.articles.map((article) => article.toString());
      articles = articles.filter(
        (item, index) => articles.indexOf(item) === index
      );
      edge.articles = articles;
      edge.size = articles.length;
      edge.save();
      return res.status(200).json({
        message: "Edge already exists",
      });
    } else {
      for (const edge of req.body) {
        const element = await new Edge({ ...edge });
        element.save();
      }
      return res.status(200).json({
        message: "Edge created",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// module.exports.createEdge = async (req, res) => {
//   try {
//     console.log(req.body);
//     for (const edge of req.body) {
//       const element = await new Edge({ ...edge });
//       element.save();
//     }
//     res.status(200).json(req.body);
//     return;
//   } catch (error) {
//     res.status(500).json(error);
//     return;
//   }
// };
