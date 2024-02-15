import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import multer from 'multer'; // Import multer
import cors from 'cors';
import questionRoutes from './routes/questionRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import fs from 'fs'; // Import fs module
import { authAdminMiddleware } from './controllers/adminController.js';
import { signOut } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 5000;

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    // Create the 'uploads' directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original file name
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"], // Adjust to your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies to be sent from the frontend
  })
);
connectDB();
app.use('/uploads', express.static('./uploads'));
app.use('/sign-out', authAdminMiddleware, signOut)
app.use('/api/admin', adminRoutes)
// app.use('/api/admin/check-authentication',protect)
app.use('/api/questions', questionRoutes);
app.use('/api/articles', articleRoutes);




app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
