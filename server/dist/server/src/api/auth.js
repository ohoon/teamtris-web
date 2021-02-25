"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jsonUtil_1 = require("../lib/jsonUtil");
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
/* Create token with Google. */
router.post('/login/google', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getToken = yield axios_1.default.post('https://oauth2.googleapis.com/token', {
            code: req.body.code,
            client_id: process.env.TEAMTRIS_GOOGLE_CLIENT_ID,
            client_secret: process.env.TEAMTRIS_GOOGLE_SECRET,
            redirect_uri: 'http://localhost:5000/auth/google',
            grant_type: 'authorization_code'
        });
        if (getToken.status != 200) {
            return res.json(jsonUtil_1.error(null, '로그인 인증 실패'));
        }
        const { access_token } = getToken.data;
        axios_1.default.defaults.headers.authorization = `Bearer ${access_token}`;
        const getUserInfo = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`);
        if (getUserInfo.status != 200) {
            return res.json(jsonUtil_1.error(null, '토큰 인증 실패'));
        }
        const { id, name, picture } = getUserInfo.data;
        const user = yield User_1.default.findOne({ userId: id }).exec();
        let _id = user ? user._id : undefined;
        if (user) {
            const updateUser = yield axios_1.default.put(`http://localhost:5005/users/${_id}`, {
                nickname: name,
                profileImage: picture
            });
            if (updateUser.status != 200) {
                return res.json(jsonUtil_1.error(null, '데이터 갱신 실패'));
            }
        }
        else {
            const createUser = yield axios_1.default.post('http://localhost:5005/users', {
                userId: id,
                nickname: name,
                profileImage: picture
            });
            if (createUser.status != 200) {
                return res.json(jsonUtil_1.error(null, '사용자 등록 실패'));
            }
            _id = createUser.data.data._id;
        }
        const payload = {
            _id: _id
        };
        const options = {
            expiresIn: 60 * 60 * 24
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err)
                return res.json(jsonUtil_1.error(err));
            return res.json(jsonUtil_1.success(token));
        });
    }
    catch (err) {
        return res.json(jsonUtil_1.error(err));
    }
}));
exports.default = router;
//# sourceMappingURL=auth.js.map