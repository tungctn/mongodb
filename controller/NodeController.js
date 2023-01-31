const Node = require("../model/Node");

module.exports.createNode = async (req, res) => {
  try {
    for (const node of req.body) {
      const element = await new Node({ ...node });
      element.save();
    }
    res.status(200).json(req.body);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
