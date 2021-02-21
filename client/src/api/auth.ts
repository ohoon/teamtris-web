import axios from 'axios';

export interface LoginInputs {
    username: string;
    password: string;
}

export async function getAccessToken(input: LoginInputs) {
    const response = await axios.post<any>(
        'http://localhost:5005/auth/login',
        input
    );
    
    return response.data;
}

export interface GoogleInputs {
    code: string;
}

export async function getAccessTokenGoogle(input: GoogleInputs) {
    const response = await axios.post<any>(
        'http://localhost:5005/auth/login/google',
        input
    );

    return response.data;
}