const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const nodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
      enum: ["PER", "ORG", "LOC"],
    },
    cluster: {
      type: String,
      default: "0"
    },
    score: {
      type: Number,
      default: 0.1
    },
  },
  { timestamps: true }
);

const Node = mongoose.model("Node", nodeSchema);
module.exports = Node;
