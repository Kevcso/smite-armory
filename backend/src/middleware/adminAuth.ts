import { Request, Response, NextFunction } from 'express';

export const checkAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  const adminPassword = req.headers['x-admin-password'];
  
  if (adminPassword === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized - Invalid admin password' });
  }
};