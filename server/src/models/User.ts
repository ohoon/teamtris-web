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
        match: /^[a-zA-Z0-9]{5,16}$/,
        trim: true,
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
        type: String,
        match: /^[가-힣a-zA-Z0-9]{2,20}$/,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        match: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
        trim: true
    }
}, {
    toObject: {
        virtuals: true
    }
});

UserSchema.virtual('passwordConfirm');

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
UserSchema.path('password').validate(function(this: UserDocument) {
    if (this.isNew) {
        if (!this.passwordConfirm) {
            return this.invalidate('passwordConfirm', 'Password Confirm is required!');
        }

        if (!passwordRegex.test(this.password)) {
            return this.invalidate('password', 'Should be 8-20 characters of alphabet and number combination!');
        }

        if (this.password !== this.passwordConfirm) {
            return this.invalidate('passwordConfirm', 'Password Confrim does not matched!');
        }
    }
})

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