import { Schema, Document, Model, model } from 'mongoose';

export interface User {
    userId: string;
    nickname: string;
    level: number;
    exp: number;
    win: number;
    lose: number;
}

export interface UserDocument extends User, Document {

}

export interface UserModel extends Model<UserDocument> {

}

const UserSchema = new Schema<UserDocument, UserModel>({
    userId: {
        type: String,
        required: [
            true,
            'UserId is required!'
        ],
        trim: true,
        unique: true
    },
    nickname: {
        type: String,
        required: [
            true,
            'Nickname is required!'
        ],
        trim: true
    },
    profileImage: {
        type: String,
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

export default model<UserDocument, UserModel>('User', UserSchema);;