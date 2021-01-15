export type ConnectedUser = {
    socketId: number;
    id: number;
    username: string;
    nickname: string | null;
};

export type ConnectedUsers = ConnectedUser[];
