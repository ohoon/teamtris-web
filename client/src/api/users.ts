import axios from 'axios';

export interface SignUpInputs {
    username: string;
    password: string;
    passwordConfirm: string;
    nickname: string | null;
    email: string | null;
}

export async function createUser(input: SignUpInputs) {
    const response = await axios.post<any>(
        'http://localhost:5005/users',
        input
    );
    
    return response.data;
}

export interface User {
    id: number;
    username: string;
    nickname: string | null;
}

export interface Me extends User {

}

export async function getMe() {
    const response = await axios.get<any>(
        'http://localhost:5005/users/me'
    );

    return response.data;
}
