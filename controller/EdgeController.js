const Edge = require("../model/Edge");

module.exports.createEdge = async (req, res) => {
  try {
    for (const edge of req.body) {
      console.log(edge);

      // Find existing edge
      const existEdge = await Edge.findOne({
        $or: [
          { source: edge.source, target: edge.target },
          { source: edge.target, target: edge.source },
        ],
      });
      console.log(existEdge);
      if (existEdge) {
        let articles = existEdge.articles?.map((article) => article.toString());
        articles = articles.concat(edge.articles);
        articles = articles.filter(
          (item, index) => articles.indexOf(item) === index
        );
        existEdge.articles = articles;
        existEdge.size = articles.length;
        existEdge.save();
        console.log("Update edge successfully");
      } else {
        const element = await new Edge({ ...edge });
        element.save();
        console.log("Create edge successfully");
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
module.exports.getAllEdgesInCSV = async (req, res) => {
  try {
    const edges = await Edge.find();
    let csv = "id,from,to,weight\n";
    for (const edge of edges) {
      csv += `${edge._id.toString()},${edge.source},${edge.target},${edge.size}\n`;
    }
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=edges.csv");
    res.status(200).send(csv);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
