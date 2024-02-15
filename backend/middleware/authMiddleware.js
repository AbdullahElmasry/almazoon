import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'

import Admin from '../models/adminModel.js'

const protect = AsyncHandler(async(req, res, next) =>{
    
  const { jwt: token } = req.cookies
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
})

const signOut = AsyncHandler(async(req, res, next) =>{
  res.setHeader(
    "Set-Cookie",
    `jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly; SameSite=None`
  ).send('done')
})

export { protect, signOut}