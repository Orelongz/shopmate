import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

const generateToken = payload => jwt.sign(payload, SECRET, { expiresIn: '24h' });

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      error: 'Token absent'
    });
  }
  return jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: 'Invalid token',
      });
    }
    req.decoded = decoded;
    return next();
  });
};

export {
  validateToken,
  generateToken
};
