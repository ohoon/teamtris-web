"use strict";
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
/* Login. */
router.post('/login', (req, res, next) => {
    let isValid = true;
    const errors = {};
    if (!req.body.userId) {
        isValid = false;
        errors.userId = { message: 'UserId is required!' };
    }
    if (!req.body.password) {
        isValid = false;
        errors.password = { message: 'Password is required!' };
    }
    if (!isValid)
        return res.json(jsonUtil_1.error({ name: 'ValidationError', errors: errors }));
    next();
}, (req, res, next) => {
    User_1.default.findOne({
        userId: req.body.userId
    })
        .select({ userId: 1, password: 1, nickname: 1, email: 1 })
        .exec((err, user) => {
        if (err)
            return res.json(jsonUtil_1.error(err));
        if (!user || user.password !== req.body.password) {
            return res.json(jsonUtil_1.error(null, 'UserId or Password is invaild!'));
        }
        const payload = {
            _id: user._id,
            userId: user.userId
        };
        const options = {
            expiresIn: 60 * 60 * 24
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err)
                return res.json(jsonUtil_1.error(err));
            res.json(jsonUtil_1.success(token));
        });
    });
});
/* Login check. */
router.get('/login', authUtil_1.isLoggedIn, (req, res, next) => {
    User_1.default.findById(req.body.decoded._id)
        .exec((err, user) => {
        if (err || !user)
            return res.json(jsonUtil_1.error(err));
        res.json(jsonUtil_1.success(user));
    });
});
/* Refresh token. */
router.put('/login', authUtil_1.isLoggedIn, (req, res, next) => {
    User_1.default.findById(req.body.decoded._id)
        .exec((err, user) => {
        if (err || !user)
            return res.json(jsonUtil_1.error(err));
        const payload = {
            _id: user._id,
            userId: user.userId
        };
        const options = {
            expiresIn: 60 * 60 * 24
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err)
                return res.json(jsonUtil_1.error(err));
            res.json(jsonUtil_1.success(token));
        });
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map