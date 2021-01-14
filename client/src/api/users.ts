import axios from 'axios';

export interface SignUpInputs {
    userId: string;
    password: string;
    passwordConfirm: string;
    nickname: string | null;
    email: string | null;
}

export async function createUser(input: SignUpInputs) {
    const response = await axios.post<any>(
        '/users',
        input
    );
    
    return response.data;
}