import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
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
      errors.username = { name: 'ValidationError', message: '아이디를 입력해 주세요.' };
    }

    if (!req.body.password) {
      isValid = false;
      errors.password = { name: 'ValidationError', message: '비밀번호를 입력해 주세요.' };
    }

    if (!isValid) return res.json(error({ errors: errors, _message: '로그인 인증 실패' }));

    next();
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findOne({ username: req.body.username }).select({ username: 1, password: 1, nickname: 1, email: 1 }).exec();

      if (!user || !user.authenticate(req.body.password)) {
        return res.json(error(null, '아이디 또는 비밀번호가 일치하지 않습니다.'));
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

/* Create token with Google. */
router.post('/login/google',
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      code: req.body.code,
      client_id: process.env.TEAMTRIS_GOOGLE_CLIENT_ID!,
      client_secret: process.env.TEAMTRIS_GOOGLE_SECRET!,
      redirect_uri: 'http://localhost:5000/auth/google',
      grant_type: 'authorization_code'
    };

    const result = await axios.post('https://oauth2.googleapis.com/token',
      payload
    );

    if (result.status == 200) {
      const token = result.data.access_token;

      axios.defaults.headers.authorization = `Bearer ${token}`;

      const userInfo = await axios.get(`
        https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}
      `);

      console.info(userInfo.data);
    }
  }
);

/* Refresh token. */
router.put('/login',
  isLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findById(req.body.decoded._id).exec();

      if (!user) return res.json(error(null, '존재하지 않는 사용자입니다.'));
      
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