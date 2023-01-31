const Node = require("../model/Node");

module.exports.createNode = async (req, res) => {
  try {
    const node = await new Node({
      ...req.body,
    });
    node.save();
    res.status(200).json(node);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
