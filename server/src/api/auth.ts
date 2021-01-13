import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CallbackError } from 'mongoose';
import { isLoggedIn } from '../lib/authUtil';
import { error, JsonError, success } from '../lib/jsonUtil';
import UserModel, { UserDocument } from '../models/User';

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
  (req: Request, res: Response, next: NextFunction) => {
    UserModel.findOne({
      userId: req.body.userId
    })
    .select({ userId: 1, password: 1, nickname: 1, email: 1 })
    .exec((err: CallbackError, user: UserDocument | null) => {
      if (err) return res.json(error(err));
      
      if (!user || user.password !== req.body.password) {
        return res.json(error(null, 'UserId or Password is invaild!'));
      }

      const payload = {
        _id: user._id,
        userId: user.userId
      };

      const options = {
        expiresIn: 60 * 60 * 24
      };

      jwt.sign(payload, process.env.JWT_SECRET!, options, (err: Error | null, token: string | undefined) => {
        if (err) return res.json(error(err));
        res.json(success(token));
      });
    });
  }
);

/* Login check. */
router.get('/login',
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    UserModel.findById(req.body.decoded._id)
    .exec((err: CallbackError, user: UserDocument | null) => {
      if (err || !user) return res.json(error(err));
      res.json(success(user));
    });
  }
);

/* Refresh token. */
router.put('/login',
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    UserModel.findById(req.body.decoded._id)
    .exec((err: CallbackError, user: UserDocument | null) => {
      if (err || !user) return res.json(error(err));
      
      const payload = {
        _id: user._id,
        userId: user.userId
      };

      const options = {
        expiresIn: 60 * 60 * 24
      };

      jwt.sign(payload, process.env.JWT_SECRET!, options, (err: Error | null, token: string | undefined) => {
        if (err) return res.json(error(err));
        res.json(success(token));
      });
    });
  }
);

export default router;
