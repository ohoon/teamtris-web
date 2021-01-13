import axios from 'axios';

export interface LoginInputs {
    userId: string;
    password: string;
}

export async function login(input: LoginInputs) {
    const response = await axios.post<any>(
        '/auth/login',
        input
    );
    
    return response.data;
}