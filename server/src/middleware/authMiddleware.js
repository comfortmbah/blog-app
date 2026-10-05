import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication required", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "blog-api",
    });
    
    req.user = decoded;

    next()
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    next(new AppError("Invalid or expired token", 401));
  }
};