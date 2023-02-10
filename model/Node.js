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

// Index with createdAt
nodeSchema.index({ updatedAt: -1 });

const Node = mongoose.model("Node", nodeSchema);
module.exports = Node;
