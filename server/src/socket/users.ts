import { Stage } from '../../../client/src/tetris/stage';

export interface ConnectedUser {
    [socketId: string]: {
        _id: string;
        username: string;
        nickname: string;
    };
}

export interface WaitingPlayer {
    [socketId: string]: {
        _id: string;
        username: string;
        nickname: string;
        isReady: boolean;
        isMaster: boolean;
    };
}

export interface Player {
    [socketId: string]: {
        _id: string;
        username: string;
        nickname: string;
        stage?: Stage;
        gameOver?: boolean;
        grade?: number;
    };
}