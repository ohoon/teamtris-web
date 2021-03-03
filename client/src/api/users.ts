import axios from 'axios';

export interface User {
    _id: string;
    nickname: string;
    profileImage: string;
    level: number;
    win: number;
    lose: number;
}

export async function getUsers() {
    const response = await axios.get<any>(
        'https://teamtris.herokuapp.com/api/users'
    );

    return response.data;
}

export interface Me extends User {
    exp: number;
}

export async function getMe() {
    const response = await axios.get<any>(
        'https://teamtris.herokuapp.com/api/users/me'
    );

    return response.data;
}
