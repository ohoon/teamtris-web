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

      const payload = {
        win: pre!.win,
        lose: pre!.lose,
        level: pre!.level,
        exp: pre!.exp + req.body.exp
      };
      
      if (req.body.isWin) {
        payload.win += 1;
      } else {
        payload.lose += 1;
      }

      let maxExp = 1000 * Math.pow(2, payload.level - 1);

      while (payload.exp >= maxExp) {
        payload.level += 1;
        payload.exp -= maxExp;
      }
      
      const post = await UserModel.findByIdAndUpdate(req.body.decoded._id, payload).exec()
      
      res.json(success(post));
    } catch (err) {
      res.json(error(err))
  }
});

export default router;