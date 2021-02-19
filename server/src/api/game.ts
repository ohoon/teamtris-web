import express, { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User';
import { isLoggedIn } from '../lib/authUtil';
import { success, error } from '../lib/jsonUtil';

const router = express.Router();

/* APPLY game result. */
router.put('/',
  isLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pre = await UserModel.findById(req.body.decoded._id).exec();

      const exp = pre!.exp + req.body.exp;
      const maxExp = 1000 * Math.pow(2, pre!.level - 1);

      const post = await UserModel.findByIdAndUpdate(req.body.decoded._id, {
        level: pre!.level + Math.floor(exp / maxExp),
        exp: exp % maxExp
      }).exec()
      
      res.json(success(post));
    } catch (err) {
      res.json(error(err))
  }
});

export default router;