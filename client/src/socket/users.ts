export type ConnectedUser = {
    socketId: string;
    id: number;
    username: string;
    nickname: string | null;
};

export type ConnectedUsers = ConnectedUser[];
