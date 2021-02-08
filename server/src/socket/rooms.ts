import { Player, WaitingPlayer } from './users';

export interface Room {
    [roomId: number]: {
        title: string;
        password: string;
        players: WaitingPlayer;
        current: number;
        max: 2 | 4 | 8;
        mode: 'single' | 'double';
        isStart: boolean;
    };
}

export interface Game {
    [roomId: number]: Player;
}