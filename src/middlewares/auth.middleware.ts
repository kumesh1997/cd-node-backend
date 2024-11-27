import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const unauthorizedResponse = {
  success: false,
  message: 'Unauthorized'
};

// Middleware for authentication
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).send(unauthorizedResponse);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(400).send(unauthorizedResponse);
  }
};

export default authMiddleware;
