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
    error: err,
    message: message
});
exports.error = error;
//# sourceMappingURL=jsonUtil.js.map