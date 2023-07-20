import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  user?: any; // Customize the type of 'user' property as per your application's needs
}

const UserAuthenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader:string | undefined = req.headers.authorization;
  const secretKey:string | undefined = process.env.JWT_SECRET_KEY;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, secretKey as string, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

export default UserAuthenticateToken;
