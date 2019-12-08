const mongoose = require('mongoose');



const commentShema = new mongoose.Schema({
  body: String
}, {timestamps: true});

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
const Comment = mongoose.model('Comment', commentShema);

module.exports = {Article, Comment};