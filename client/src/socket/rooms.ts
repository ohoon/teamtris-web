export interface RoomCreateInputs {
    title: string;
    password: string;
    max: 2 | 4 | 8;
    mode: 'single' | 'double';
};