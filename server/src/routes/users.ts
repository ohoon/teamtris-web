import express, { Request, Response, NextFunction } from 'express';
import { CallbackError } from 'mongoose';
import UserModel, { User } from '../models/User';

const router = express.Router();

/* CREATE User. */
router.post('/', function(req: Request, res: Response, next: NextFunction) {
  UserModel.create(req.body, (err: CallbackError, user: User) => {
    if (err) res.json(err)
    res.json(user);
  });
});

export default router;
