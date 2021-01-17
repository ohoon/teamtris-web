"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
const success = (data) => ({
    success: true,
    data: data,
    error: null,
    message: null
});
exports.success = success;
const error = (err, message) => ({
    success: false,
    data: null,
    error: err && errorHandler(err),
    message: message || err._message
});
exports.error = error;
const errorHandler = (err) => {
    let result = {};
    if (err.errors) {
        result = err.errors;
    }
    else if (err.code == '11000') {
        if (err.errmsg.indexOf('username') > -1) {
            result.username = { name: 'DuplicateError', message: '이미 등록된 아이디입니다.' };
        }
        else if (err.errmsg.indexOf('nickname') > -1) {
            result.nickname = { name: 'DuplicateError', message: '이미 등록된 닉네임입니다.' };
        }
    }
    else {
        result.unhandled = err;
    }
    return result;
};
//# sourceMappingURL=jsonUtil.js.map