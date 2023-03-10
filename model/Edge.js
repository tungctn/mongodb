const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const edgeSchema = new mongoose.Schema(
  {
    source: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Node",
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Node",
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Article",
      },
    ],
    size: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Index with createdAt
edgeSchema.index({ updatedAt: -1 });

const Edge = mongoose.model("Edge", edgeSchema);
module.exports = Edge;
