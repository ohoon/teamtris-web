"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
;
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
    error: (err) ? parseError(err) : null,
    message: message
});
exports.error = error;
const parseError = (err) => {
    let parsed = {};
    if (err.name == 'ValidationError') {
        parsed = err.errors;
    }
    else if (err.code == '11000' && 'username' in err.errmsg) {
        parsed.username = { message: 'This username already exists!' };
    }
    else {
        parsed.unhandled = err;
    }
    return parsed;
};
//# sourceMappingURL=jsonUtil.js.map