"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [
            true,
            'Username is required!'
        ],
        match: /^[a-zA-Z0-9]{5,16}$/,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [
            true,
            'Password is required!'
        ],
        select: false
    },
    nickname: {
        type: String,
        match: /^[가-힣a-zA-Z0-9]{2,20}$/,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        match: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
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
UserSchema.virtual('passwordConfirm');
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
UserSchema.path('password').validate(function () {
    if (this.isNew) {
        if (!this.passwordConfirm) {
            return this.invalidate('passwordConfirm', 'Password Confirm is required!');
        }
        if (!passwordRegex.test(this.password)) {
            return this.invalidate('password', 'Should be 8-20 characters of alphabet and number combination!');
        }
        if (this.password !== this.passwordConfirm) {
            return this.invalidate('passwordConfirm', 'Password Confrim does not matched!');
        }
    }
});
UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt_1.hashSync(this.password, 12);
        return next();
    }
    next();
});
UserSchema.methods.authenticate = function (password) {
    return bcrypt_1.compareSync(password, this.password);
};
exports.default = mongoose_1.model('User', UserSchema);
;
//# sourceMappingURL=User.js.map