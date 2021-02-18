import axios from 'axios';

export async function applyResult(exp: number) {
    const response = await axios.put<any>(
        'http://localhost:5005/game',
        {
            exp: exp
        }
    );
    
    return response.data;
}
