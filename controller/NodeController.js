const Node = require("../model/Node");

module.exports.createNode = async (req, res) => {
  try {
    let arr = [];
    for (const node of req.body) {
      const node_search = await Node.findOne({ name: node.name });
      if (node_search) {
        arr.push(node_search._id);
      } else {
        const element = await new Node({ ...node });
        arr.push(element._id);
        element.save();
      }
    }
    res.status(200).json(arr);
    return;
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.getNodes = async (req, res) => {
  try {
    const nodes = await Node.find();
    res.status(200).json(nodes);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};

module.exports.getAllNodesInCSV = async (req, res) => {
  try {
    const nodes = await Node.find();
    let csv = "id,entity,type,cluster,score\n";
    for (const node of nodes) {
      csv += `${node._id.toString()},${node.name},${node.type},${node.cluster},${node.score}\n`;
    }
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=nodes.csv");
    res.status(200).send(csv);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};