const Edge = require("../model/Edge");

module.exports.createEdge = async (req, res) => {
  try {
    for (const edge of req.body) {
      const element = await new Edge({ ...edge });
      element.save();
    }
    res.status(200).json(req.body);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
