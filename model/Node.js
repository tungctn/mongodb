const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const nodeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    enum: ["PER", "ORG", "LOC"],
  },
});

const Node = mongoose.model("Node", nodeSchema);
module.exports = Node;
