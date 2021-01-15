import { Schema, Document, model } from 'mongoose';

const UserSchema = new Schema({
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

interface User {
    username: string;
    password: string;
    nickname: string | null;
    email: string | null;
}

export interface UserDocument extends User, Document {
    passwordConfirm: string;
}

const UserModel = model<UserDocument>('User', UserSchema);

export default UserModel;