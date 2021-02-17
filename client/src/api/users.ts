import axios from 'axios';

export interface SignUpInputs {
    username: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    email: string;
}

export async function createUser(input: SignUpInputs) {
    const response = await axios.post<any>(
        'http://localhost:5005/users',
        input
    );
    
    return response.data;
}

export interface User {
    _id: string;
    username: string;
    nickname: string;
    level: number;
    win: number;
    lose: number;
}

export interface Me extends User {
    exp: number;
}

export async function getMe() {
    const response = await axios.get<any>(
        'http://localhost:5005/users/me'
    );

    return response.data;
}
