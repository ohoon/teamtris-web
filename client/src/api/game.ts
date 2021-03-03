import axios from 'axios';

export async function applyResult(isWin: boolean, exp: number) {
    const response = await axios.put<any>(
        'https://teamtris.herokuapp.com/api/game',
        {
            isWin: isWin,
            exp: exp
        }
    );
    
    return response.data;
}
