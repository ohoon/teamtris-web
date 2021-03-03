import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { error, success } from '../lib/jsonUtil';
import UserModel from '../models/User';

const router = express.Router();

/* Create token with Google. */
router.post('/login/google',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getToken = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code: req.body.code,
          client_id: process.env.TEAMTRIS_GOOGLE_CLIENT_ID!,
          client_secret: process.env.TEAMTRIS_GOOGLE_SECRET!,
          redirect_uri: 'https://teamtris.herokuapp.com/auth/google',
          grant_type: 'authorization_code'
        }
      );
  
      if (getToken.status != 200) {
        return res.json(error(null, '로그인 인증 실패'));
      }

      const { access_token } = getToken.data;

      axios.defaults.headers.authorization = `Bearer ${access_token}`;

      const getUserInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
      );

      if (getUserInfo.status != 200) {
        return res.json(error(null, '토큰 인증 실패'));
      }

      const { id, name, picture } = getUserInfo.data;
      const user = await UserModel.findOne({ userId: id }).exec();
      let _id = user ? user._id : undefined;

      if (user) {
        const updateUser = await axios.put(
          `/api/users/${_id}`,
          {
            nickname: name,
            profileImage: picture
          }
        );
        
        if (updateUser.status != 200) {
          return res.json(error(null, '데이터 갱신 실패'));
        }
      } else {
        const createUser = await axios.post(
          '/api/users',
          {
            userId: id,
            nickname: name,
            profileImage: picture
          }
        );
        
        if (createUser.status != 200) {
          return res.json(error(null, '사용자 등록 실패'));
        }

        _id = createUser.data.data._id;
      }

      const payload = {
        _id: _id
      };

      const options = {
        expiresIn: 60 * 60 * 24
      };

      jwt.sign(payload, process.env.JWT_SECRET!, options, (err, token) => {
        if (err) return res.json(error(err));
        return res.json(success(token));
      });
    } catch (err) {
      return res.json(error(err));
    }
  }
);

export default router;