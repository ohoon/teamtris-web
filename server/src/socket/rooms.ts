import { WaitingPlayers } from './users';

export interface Room {
    id: number;
    title: string;
    password: string;
    players: WaitingPlayers;
    current: number;
    max: 2 | 4 | 8;
    mode: 'single' | 'double';
    isStart: boolean;
}

export type Rooms = Room[];