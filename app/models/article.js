const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    author: { type: String, required: true },
    published: { type: Boolean, default: true },
    publishedOn: { type: Date, default: Date.now },
  }, {
    timestamps: true,
  });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;