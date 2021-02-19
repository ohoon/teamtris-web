import axios from 'axios';

export async function applyResult(isWin: boolean, exp: number) {
    const response = await axios.put<any>(
        'http://localhost:5005/game',
        {
            isWin: isWin,
            exp: exp
        }
    );
    
    return response.data;
}
