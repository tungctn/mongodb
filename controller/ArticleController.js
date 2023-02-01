const Article = require("../model/Article");

module.exports.createArticle = async (req, res) => {
  try {
    let arr = [];
    for (const article of req.body) {
      const article_search = await Article.findOne({ title: article.title });
      if (article_search) {
        arr.push(article_search._id);
      } else {
        const element = await new Article({ ...article });
        arr.push(element._id);
        element.save();
      }
    }
    res.status(200).json(arr);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};

module.exports.getArticle = async (req, res) => {
  try {
    const article = await Article.find();
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json(error);
  }
};
