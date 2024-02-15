import express from 'express';
import { getQuestions, createQuestion, editQuestion, deleteQuestion } from '../controllers/questionController.js';
import { authAdmin, authAdminMiddleware } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/questions
// Fetch questions with pagination
router.get('/get-questions', getQuestions);

// POST /api/questions
// Create a question
router.post('/create-question', createQuestion);
router.post('/:id/edit-response',authAdminMiddleware, editQuestion)
router.delete('/:id/delete-question',authAdminMiddleware , deleteQuestion);




export default router;

