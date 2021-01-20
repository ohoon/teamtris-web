export type RoomCreateInputs = {
    title: string;
    password: string;
    max: 2 | 4 | 8;
    mode: 'single' | 'double';
};

export type Room = {
    id: number;
    title: string;
    password: string;
    participant: string[];
    current: number;
    max: 2 | 4 | 8;
    mode: 'single' | 'double';
};

export type Rooms = Room[];