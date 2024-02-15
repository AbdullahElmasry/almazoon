import express from 'express';
const router = express.Router();

import { makeArticle, deleteArticle, getArticles, getArticleById } from '../controllers/articleController.js';
import { authAdmin, authAdminMiddleware } from '../controllers/adminController.js';


router.post('/make-article', authAdminMiddleware,makeArticle);
router.delete('/:id/delete-article',authAdminMiddleware, deleteArticle);
router.get('/get-articles',getArticles)
router.get('/:id', getArticleById)
export default router