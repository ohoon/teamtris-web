import { Server } from 'http';
import { Server as socketIO, Socket } from 'socket.io';

interface ConnectedUser {
    socketId: string;
    id: number;
    username: string;
    nickname: string | null;
}

interface Room {
    id: number;
    title: string;
    password: string;
    participant: string[];
    current: number;
    max: 2 | 4 | 8;
    mode: 'single' | 'double';
}

interface RoomCreateInputs {
    title: string;
    password: string;
    max: 2 | 4 | 8;
    mode: 'single' | 'double';
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
    let rooms: Room[] = [];
    let roomRef = 1;

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

        socket.on('request roomlist', () => {
            socket.emit('update roomlist', rooms);
        });

        socket.on('create room', (input: RoomCreateInputs) => {
            console.log(io.sockets.allSockets())
            const room = {
                ...input,
                id: roomRef++,
                title: input.title || '테트리스 같이 해요',
                participant: [socket.id],
                current: 1
            };

            rooms.push(room);
            io.emit('update roomlist', rooms);
        });

        socket.on('send chat', (chat: Chat) => {
            io.emit('receive chat', chat);
        });
    });

    io.on('disconnection', () => {
        console.log('연결 해제');
    })
}
