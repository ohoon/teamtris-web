import { Schema, Document, Model, model } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';

export interface User {
    username: string;
    password: string;
    nickname: string | null;
    email: string | null;
}

export interface UserDocument extends User, Document {
    passwordConfirm: string;
    authenticate(password: string): boolean;
}

export interface UserModel extends Model<UserDocument> {

}

const UserSchema = new Schema<UserDocument, UserModel>({
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

UserSchema.pre<UserDocument>('save', function(next) {
    if (this.isModified('password')) {
        this.password = hashSync(this.password, 12);
        return next();
    }

    next();
});

UserSchema.methods.authenticate = function(this: UserDocument, password: string) {
    return compareSync(password, this.password);
};

export default model<UserDocument, UserModel>('User', UserSchema);;