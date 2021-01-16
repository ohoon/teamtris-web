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
        type: String
    },
    email: {
        type: String
    }
}, {
    toObject: {
        virtuals: true
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