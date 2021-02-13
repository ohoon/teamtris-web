import { WaitingPlayer } from '../../../server/src/socket/users';

export interface RoomInputs {
    title: string;
    password: string;
    max: 2 | 4 | 8;
    mode: 'single' | 'double';
}

export interface CurrentRoom {
    roomId: number;
    title: string;
    password: string;
    players: WaitingPlayer;
    current: number;
    max: 2 | 4 | 8;
    mode: 'single' | 'double';
    isStart: boolean;
}