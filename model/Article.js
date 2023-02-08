const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const articleSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    pubDate: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["news", "economy", "world", "entertainment"],
    }
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
