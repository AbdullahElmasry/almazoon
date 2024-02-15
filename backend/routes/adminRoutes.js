import express from 'express';
import { adminLogin,authAdmin, authAdminMiddleware } from '../controllers/adminController.js';
import { signOut } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/check-authentication',authAdmin);
router.post('/login', adminLogin);
export default router;