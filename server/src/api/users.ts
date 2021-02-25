import express, { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User';
import { isLoggedIn } from '../lib/authUtil';
import { success, error } from '../lib/jsonUtil';

const router = express.Router();

/* SHOW me. */
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

/* GET users. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.find();
    res.json(success(users));
  } catch (err) {
    res.json(error(err))
  }
});

/* CREATE user. */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.create(req.body);
    res.json(success(user));
  } catch (err) {
    res.json(error(err))
  }
});

/* UPDATE user. */
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.json(success(user));
  } catch (err) {
    res.json(error(err))
  }
});

export default router;