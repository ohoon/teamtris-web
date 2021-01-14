import express, { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User';
import { success, error } from '../lib/jsonUtil';

const router = express.Router();

/* CREATE user. */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.create(req.body);
    res.json(success(user));
  } catch (err) {
    res.json(error(err))
  }
});

export default router;
