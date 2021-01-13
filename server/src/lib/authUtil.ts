import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { error } from './jsonUtil';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'];

    if (!token) return res.json(error(null, 'token is required!'));
  
    jwt.verify(token && token[0], process.env.JWT_SECRET!, (err: any, decoded: any) => {
        if (err) return res.json(error(err));
        
        req.body.decoded = decoded;
        next();
    });
};