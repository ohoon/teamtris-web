import axios from 'axios';

export interface LoginInputs {
    username: string;
    password: string;
}

export async function getAccessToken(input: LoginInputs) {
    const response = await axios.post<any>(
        '/auth/login',
        input
    );
    
    return response.data;
}
