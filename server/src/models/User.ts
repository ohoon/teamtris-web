import { Schema, Document, model } from 'mongoose';

const UserSchema = new Schema({
    userId: {
        type: String,
        required: [
            true,
            'UserId is required!'
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

export interface User {
    userId: string;
    password: string;
    nickname?: string;
    email?: string;
}

export interface UserDocument extends User, Document {
    passwordConfirm: string;
}

const UserModel = model<UserDocument>('User', UserSchema);

export default UserModel;