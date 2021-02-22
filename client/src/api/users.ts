import axios from 'axios';

export interface User {
    _id: string;
    username: string;
    nickname: string;
    level: number;
    win: number;
    lose: number;
}

export async function getUsers() {
    const response = await axios.get<any>(
        'http://localhost:5005/users/'
    );

    return response.data;
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
