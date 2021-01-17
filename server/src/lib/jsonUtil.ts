export const success = (data: any) => ({
    success: true,
    data: data,
    error: null,
    message: null
});

export const error = (err: any, message?: string) => ({
    success: false,
    data: null,
    error: err && errorHandler(err),
    message: message || err._message
});

const errorHandler = (err: any) => {
    let result: any = {};
    
    if (err.errors) {
        result = err.errors;
    } else if (err.code == '11000') {
        if (err.errmsg.indexOf('username') > -1) {
            result.username = { name: 'DuplicateError', message: '이미 등록된 아이디입니다.'};
        } else if (err.errmsg.indexOf('nickname') > -1) {
            result.nickname = { name: 'DuplicateError', message: '이미 등록된 닉네임입니다.'};
        }
    } else {
        result.unhandled = err;
    }

    return result;
};