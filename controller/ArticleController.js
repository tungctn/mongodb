const Article = require("../model/Article");

module.exports.createArticle = async (req, res) => {
  try {
    for (const article of req.body) {
      const element = await new Article({ ...article });
      element.save();
    }
    res.status(200).json(req.body);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
