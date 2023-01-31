const Edge = require("../model/Edge");

module.exports.createEdge = async (req, res) => {
  try {
    const edge = await new Edge({
      ...req.body,
    });
    edge.save();
    res.status(200).json(edge);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
