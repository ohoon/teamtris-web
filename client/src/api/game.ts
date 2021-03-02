import axios from 'axios';

export async function applyResult(isWin: boolean, exp: number) {
    const response = await axios.put<any>(
        'https://teamtris-server.herokuapp.com/game',
        {
            isWin: isWin,
            exp: exp
        }
    );
    
    return response.data;
}
