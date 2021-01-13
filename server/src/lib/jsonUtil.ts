export interface JsonError {
    userId?: { message: string };
    password?: { message: string };
    unhandled?: any;
};

export const success = (data: any) => ({
    success: true,
    data: data,
    error: null,
    message: null
});

export const error = (err: any, message?: string) => ({
    success: false,
    data: null,
    error: (err) ? parseError(err) : null,
    message: message
});

const parseError = (err: any) => {
    let parsed: JsonError = {};
    
    if (err.name == 'ValidationError') {
        parsed = err.errors;
    } else if (err.code == '11000' && 'userId' in err.errmsg) {
        parsed.userId = { message: 'This userId already exists!'};
    } else {
        parsed.unhandled = err;
    }

    return parsed;
};