import { Server } from 'http';
import { Server as socketIO, Socket } from 'socket.io';

interface ConnectedUser {
    socketId: string;
    id: number;
    username: string;
    nickname: string | null;
}

interface Chat {
    sender: string;
    message: string;
}

export default function createSocketIoServer(server: Server) {
    const io = new socketIO(server, {
        cors: {
            origin: 'http://localhost:5000'
        }
    });

    let users: ConnectedUser[] = [];

    io.on('connection', (socket: Socket) => {
        console.log(`연결된 socket ID: ${socket.id}`);

        socket.on('join channel', (user: ConnectedUser | null) => {
            user && users.push(user);
            io.emit('update userlist', users);
        });

        socket.on('leave channel', (socketId: string) => {
            users = users.filter(user => user.socketId !== socketId);
            io.emit('update userlist', users);
        });

        socket.on('send chat', (chat: Chat) => {
            io.emit('receive chat', chat);
        });
    });

    io.on('disconnection', () => {
        console.log('연결 해제');
    })
}
