import { Stage } from '../../client/src/tetris/stage';

export interface ConnectedUser {
    [socketId: string]: {
        _id: string;
        nickname: string;
        level: number;
    };
}

export interface WaitingPlayer {
    [socketId: string]: {
        _id: string;
        nickname: string;
        profileImage: string;
        isReady: boolean;
        isMaster: boolean;
        team?: string;
    };
}

export interface Player {
    [socketId: string]: {
        _id: string;
        nickname: string;
        team?: string;
        stage?: Stage;
        gameOver?: boolean;
        grade?: number;
    };
}