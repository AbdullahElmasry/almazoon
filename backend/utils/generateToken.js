import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
  
  res.setHeader(
    "Set-Cookie",
    `jwt=${token}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=2592000` // Max-Age is equivalent to 30 days in seconds
  );
};

export default generateToken;
