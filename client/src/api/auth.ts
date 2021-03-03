import axios from 'axios';

export interface GoogleInputs {
    code: string;
}

export async function getAccessTokenGoogle(input: GoogleInputs) {
    const response = await axios.post<any>(
        '/api/auth/login/google',
        input
    );

    return response.data;
}