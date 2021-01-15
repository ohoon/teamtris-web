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
const User_1 = __importDefault(require("../models/User"));
const authUtil_1 = require("../lib/authUtil");
const jsonUtil_1 = require("../lib/jsonUtil");
const router = express_1.default.Router();
/* CREATE user. */
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.create(req.body);
        res.json(jsonUtil_1.success(user));
    }
    catch (err) {
        res.json(jsonUtil_1.error(err));
    }
}));
/* SHOW me. */
router.get('/me', authUtil_1.isLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.body.decoded._id).exec();
        res.json(jsonUtil_1.success(user));
    }
    catch (err) {
        res.json(jsonUtil_1.error(err));
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map