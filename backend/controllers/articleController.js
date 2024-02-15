// controllers/articleController.js

import Article from '../models/articleModel.js';
import upload from '../multerConfig.js'; // Import Multer middleware configuration

// Controller function to create a new article with file upload
export const makeArticle = async (req, res) => {
    try {
      // Handle file upload using Multer middleware
      upload.single('image')(req, res, async (err) => {
        if (err) {
          console.error('Error uploading file:', err);
          return res.status(500).json({ message: 'Error uploading file' });
        }
  
        const { title, content } = req.body;
        const image = req.file ? req.file.filename : null; // Store the filename of the uploaded image if available
  
        // Create a new article
        const newArticle = new Article({
          title,
          content,
          image
        });
  
        try {
          // Save the article to the database
          await newArticle.save();
          res.status(201).json({ message: 'Article created successfully', data: newArticle });
        } catch (error) {
          console.error('Error saving article:', error);
          res.status(500).json({ message: 'Error saving article' });
        }
      });
    } catch (error) {
      console.error('Error creating article:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


export const deleteArticle = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the article by ID and delete it
      const deletedArticle = await Article.findByIdAndDelete(id);
  
      if (!deletedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
      console.error('Error deleting article:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const getArticles = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      // Query database to retrieve articles
      const articles = await Article.find()
        .sort({ createdAt: -1 }) // Sort by newest articles first
        .skip(skip)
        .limit(limit)
        .exec();
  
      res.json({
        articles,
        currentPage: page,
        totalPages: Math.ceil(await Article.countDocuments() / limit),
      });
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  export const getArticleById = async (req, res) => {
    const { id } = req.params;
    
    try {
      const article = await Article.findById(id);
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
      res.json(article);
    } catch (error) {
      console.error('Error retrieving article by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };