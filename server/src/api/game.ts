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

      const post = await UserModel.findByIdAndUpdate(req.body.decoded._id, {
        level: pre!.level + Math.floor((pre!.exp + req.body.exp) / (1000 * Math.pow(2, pre!.level - 1))),
        exp: (pre!.exp + req.body.exp) % (1000 * Math.pow(2, pre!.level - 1))
      }).exec()
      
      res.json(success(post));
    } catch (err) {
      res.json(error(err))
  }
});

export default router;