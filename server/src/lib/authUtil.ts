import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { error } from './jsonUtil';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) return res.json(error(null, 'token is required!'));
  
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) return res.json(error(err));
        
        req.body.decoded = decoded;
        next();
    });
};