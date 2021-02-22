import axios from 'axios';

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