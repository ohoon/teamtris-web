export type CurrentUser = {
    socketId: number;
    username: string;
    nickname: string | null;
};

export type CurrentUsers = CurrentUser[];
