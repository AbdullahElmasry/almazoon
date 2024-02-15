// models/articleModel.js

import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String, // Store the filename or path of the uploaded image
    default: null
  }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

export default Article;
