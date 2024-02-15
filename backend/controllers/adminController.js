import jwt from 'jsonwebtoken';
import AsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Admin from '../models/adminModel.js';
import generateToken from '../utils/generateToken.js';


const authAdmin = AsyncHandler(async (req, res, next) => {
  const { jwt: token } = req.cookies
  
  if (!token) {
    return res.status(401).json({
      isAuthenticated: false,
      isAdmin: false
    })
  }

  try {
    // Verify the token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is authenticated as an admin
    const admin = await Admin.findById(decoded.userId);
    if (!admin) {
      res.status(401).json({
        isAuthenticated: false,
        isAdmin: false
      })
      throw new Error('Not authorized, not an admin');
    }
    res.
      status(200)
      .json({
        isAuthenticated: true,
        isAdmin: true
      })

  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401);
    throw new Error('Not authorized, invalid token');
  }
});


const authAdminMiddleware = async (req, res, next) => {
  // Check if the cookie contains the JWT token
  const token = req.cookies.jwt;
  

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add the decoded token payload to the request object
    req.user = decoded;

    // Call next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};


const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ email });

    if (admin) {
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      
      if (isPasswordValid) {
        generateToken(res, admin._id);
        
        return res.json({ success: true, message: 'Login successful' });
      }
    }

    res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};







export { adminLogin, authAdmin, authAdminMiddleware };
