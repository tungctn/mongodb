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

    for (const edge of req.body) {
      console.log(edge.source);
      console.log(edge.target);
      if (
        (arr_source.includes(edge.source) && arr_target.includes(edge.target)) ||
        (arr_source.includes(edge.target) && arr_target.includes(edge.source))
      ) {
        // Find existing edge
        const existEdge = await Edge.findOne({
          $or: [
            { source: edge.source, target: edge.target },
            { source: edge.target, target: edge.source },
          ],
        });
        let articles = existEdge.articles.map((article) => article.toString());
        articles = articles.concat(edge.articles);
        articles = articles.filter(
          (item, index) => articles.indexOf(item) === index
        );
        existEdge.articles = articles;
        existEdge.size = articles.length;
        existEdge.save();
      } else {
        const element = await new Edge({ ...edge });
        element.save();
      }
    }
    res.status(200).json({
      message: "Create edges successfully",
    });
    return;
  } catch (error) {
    return res.status(500).json(error.message);
  }
};