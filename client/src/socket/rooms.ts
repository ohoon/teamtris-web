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

type Team = {
    [team: string]: {
        color: string;
    };
};

export const TEAM: Team = {
    'A': {
        color: '#AAC6C6'
    },
    'B': {
        color: '#AA8A8A'
    },
    'C': {
        color: '#AA90DF'
    },
    'D': {
        color: '#AA981A'
    }
};