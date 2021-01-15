export type Chat = {
    id: number;
    sender: string;
    message: string;
};

export type ChatLog = Chat[];