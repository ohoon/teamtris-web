import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isLoggedIn } from '../lib/authUtil';
import { error, success } from '../lib/jsonUtil';
import UserModel from '../models/User';

const router = express.Router();

/* Create token. */
router.post('/login',
  (req: Request, res: Response, next: NextFunction) => {
    let isValid = true;
    const errors: any = {};

    if (!req.body.username) {
      isValid = false;
      errors.username = { name: 'ValidationError', message: 'Username is required!' };
    }

    if (!req.body.password) {
      isValid = false;
      errors.password = { name: 'ValidationError', message: 'Password is required!' };
    }

    if (!isValid) return res.json(error({ errors: errors, _message: 'Login validation failed' }));

    next();
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findOne({ username: req.body.username }).select({ username: 1, password: 1, nickname: 1, email: 1 }).exec();

      if (!user || !user.authenticate(req.body.password)) {
        return res.json(error(null, 'Username or Password is invaild!'));
      }

      const payload = {
        _id: user._id,
        username: user.username,
        nickname: user.nickname
      };

      const options = {
        expiresIn: 60 * 60 * 24
      };

      jwt.sign(payload, process.env.JWT_SECRET!, options, (err, token) => {
        if (err) return res.json(error(err));
        res.json(success(token));
      });
    } catch (err) {
      res.json(error(err));
    }
  }
);

/* Refresh token. */
router.put('/login',
  isLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findById(req.body.decoded._id).exec();

      if (!user) return res.json(error(null, '_id is invaild!'));
      
      const payload = {
        _id: user._id,
        username: user.username,
        nickname: user.nickname
      };

      const options = {
        expiresIn: 60 * 60 * 24
      };

      jwt.sign(payload, process.env.JWT_SECRET!, options, (err, token) => {
        if (err) return res.json(error(err));
        res.json(success(token));
      });
    } catch (err) {
      res.json(error(err));
    }
  }
);

export default router;
