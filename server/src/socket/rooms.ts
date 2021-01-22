import { Players } from './users';

export interface Room {
    id: number;
    title: string;
    password: string;
    players: Players;
    current: number;
    max: 2 | 4 | 8;
    mode: 'single' | 'double';
}

export type Rooms = Room[];