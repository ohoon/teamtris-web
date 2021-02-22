"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: [
            true,
            'UserId is required!'
        ],
        trim: true,
        unique: true
    },
    nickname: {
        type: String,
        required: [
            true,
            'Nickname is required!'
        ],
        trim: true
    },
    profileImage: {
        type: String,
        trim: true
    },
    level: {
        type: Number,
        default: 1,
        min: 1
    },
    exp: {
        type: Number,
        default: 0,
        min: 0
    },
    win: {
        type: Number,
        default: 0,
        min: 0
    },
    lose: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    toObject: {
        virtuals: true
    }
});
exports.default = mongoose_1.model('User', UserSchema);
;
//# sourceMappingURL=User.js.map