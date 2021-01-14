type CurrentUser = {
    socketId: number;
    username: string;
    nickname: string | null;
};

export type CurrentUsers = CurrentUser[];

export type Profile = {
    id: number;
    username: string;
    nickname: string | null;
};