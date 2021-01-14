import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isLoggedIn } from '../lib/authUtil';
import { error, JsonError, success } from '../lib/jsonUtil';
import UserModel from '../models/User';

const router = express.Router();

/* Login. */
router.post('/login',
  (req: Request, res: Response, next: NextFunction) => {
    let isValid = true;
    const errors: JsonError = {};

    if (!req.body.userId) {
      isValid = false;
      errors.userId = { message: 'UserId is required!' };
    }

    if (!req.body.password) {
      isValid = false;
      errors.password = { message: 'Password is required!' };
    }

    if (!isValid) return res.json(error({ name: 'ValidationError', errors: errors }));

    next();
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findOne({ userId: req.body.userId }).select({ userId: 1, password: 1, nickname: 1, email: 1 }).exec();

      if (!user || user.password !== req.body.password) {
        return res.json(error(null, 'UserId or Password is invaild!'));
      }

      const payload = {
        _id: user._id,
        userId: user.userId,
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

/* Show me. */
router.get('/me',
  isLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findById(req.body.decoded._id).exec();
      res.json(success(user));
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
        userId: user.userId,
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
