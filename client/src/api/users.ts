import axios from 'axios';

export interface SignUpInputs {
    userId: string;
    password: string;
    passwordConfirm: string;
    nickname?: string;
    email?: string;
}

export async function createUser(input: SignUpInputs) {
    const response = await axios.post<any>(
        '/users',
        input
    );
    
    return response.data;
}