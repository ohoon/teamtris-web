import { Stage } from '../../../client/src/tetris/stage';

export interface ConnectedUser {
    socketId: string;
    _id: string;
    username: string;
    nickname: string;
}

export type ConnectedUsers = ConnectedUser[];

export interface WaitingPlayer extends ConnectedUser {
    isReady: boolean;
    isMaster: boolean;
}

export type WaitingPlayers = WaitingPlayer[];

export interface Player extends ConnectedUser {
    stage: Stage;
    gameOver: boolean;
    grade?: number;
}

export type Players = Player[];