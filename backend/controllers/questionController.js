import mongoose from 'mongoose';
import Question from '../models/questionModel.js';

// Fetch questions with pagination
const getQuestions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch questions sorted by createdAt field in descending order
    const questions = await Question.find()
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: 'success',
      data: questions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};


const editQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const { response } = req.body;
  
      // Check if the ID is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid question ID' });
      }
  
      // Find the question by ID and update its response
      const question = await Question.findByIdAndUpdate(id, { response }, { new: true });
  
      // Check if the question exists
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.status(200).json({ message: 'Response updated successfully', data: question });
    } catch (error) {
      console.error('Error editing response:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Create a question
const createQuestion = async (req, res) => {
  try {
    const { name, question } = req.body;
    
    const newQuestion = await Question.create({ name, question });
    res.status(201).json({
      status: 'success',
      data: newQuestion
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 'error',
      message: err.message || 'Invalid data provided'
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid question ID' });
    }

    // Find the question by ID and delete it
    const deletedQuestion = await Question.findByIdAndDelete(id);

    // Check if the question exists
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { getQuestions, createQuestion, editQuestion, deleteQuestion };
