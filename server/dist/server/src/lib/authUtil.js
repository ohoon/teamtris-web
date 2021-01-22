"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jsonUtil_1 = require("./jsonUtil");
const isLoggedIn = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token)
        return res.json(jsonUtil_1.error(null, 'token is required!'));
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.json(jsonUtil_1.error(err));
        req.body.decoded = decoded;
        next();
    });
};
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=authUtil.js.map