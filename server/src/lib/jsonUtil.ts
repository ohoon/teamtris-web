export const success = (data: any) => ({
    success: true,
    data: data,
    error: null,
    message: null
});

export const error = (err: any, message?: string) => ({
    success: false,
    data: null,
    error: err,
    message: message
});