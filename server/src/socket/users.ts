export interface ConnectedUser {
    socketId: string;
    id: number;
    username: string;
    nickname: string;
}

export type ConnectedUsers = ConnectedUser[];

export interface Player extends ConnectedUser {

}

export type Players = Player[];