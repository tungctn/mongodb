const Article = require("../model/Article");

module.exports.createArticle = async (req, res) => {
  try {
    const article = await new Article({
      ...req.body,
    });
    article.save();
    res.status(200).json(article);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
