type Room = {
    id: number;
    title: string;
    password: string | null;
    current: number;
    max: number;
    mode: string;
    isLock: boolean;
};

export type Rooms = Room[];