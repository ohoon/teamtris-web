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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authUtil_1 = require("../lib/authUtil");
const jsonUtil_1 = require("../lib/jsonUtil");
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
/* Create token. */
router.post('/login', (req, res, next) => {
    let isValid = true;
    const errors = {};
    if (!req.body.username) {
        isValid = false;
        errors.username = { name: 'ValidationError', message: '아이디를 입력해 주세요.' };
    }
    if (!req.body.password) {
        isValid = false;
        errors.password = { name: 'ValidationError', message: '비밀번호를 입력해 주세요.' };
    }
    if (!isValid)
        return res.json(jsonUtil_1.error({ errors: errors, _message: '로그인 인증 실패' }));
    next();
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ username: req.body.username }).select({ username: 1, password: 1, nickname: 1, email: 1 }).exec();
        if (!user || !user.authenticate(req.body.password)) {
            return res.json(jsonUtil_1.error(null, '아이디 또는 비밀번호가 일치하지 않습니다.'));
        }
        const payload = {
            _id: user._id,
            username: user.username,
            nickname: user.nickname
        };
        const options = {
            expiresIn: 60 * 60 * 24
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err)
                return res.json(jsonUtil_1.error(err));
            res.json(jsonUtil_1.success(token));
        });
    }
    catch (err) {
        res.json(jsonUtil_1.error(err));
    }
}));
/* Refresh token. */
router.put('/login', authUtil_1.isLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.body.decoded._id).exec();
        if (!user)
            return res.json(jsonUtil_1.error(null, '존재하지 않는 사용자입니다.'));
        const payload = {
            _id: user._id,
            username: user.username,
            nickname: user.nickname
        };
        const options = {
            expiresIn: 60 * 60 * 24
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err)
                return res.json(jsonUtil_1.error(err));
            res.json(jsonUtil_1.success(token));
        });
    }
    catch (err) {
        res.json(jsonUtil_1.error(err));
    }
}));
exports.default = router;
//# sourceMappingURL=auth.js.map