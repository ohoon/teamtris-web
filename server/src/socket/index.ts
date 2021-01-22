import { Server } from 'http';
import { Server as socketIO, Socket } from 'socket.io';
import { ConnectedUser, ConnectedUsers, Player } from './users';
import { Rooms } from './rooms';
import { Chat } from './chats';
import { RoomCreateInputs } from '../../../client/src/socket/rooms';

export default function createSocketIoServer(server: Server) {
    const io = new socketIO(server, {
        cors: {
            origin: 'http://localhost:5000'
        }
    });

    let users: ConnectedUsers = [];
    let rooms: Rooms = [];
    let roomRef = 1;

    io.on('connection', (socket: Socket) => {
        console.log(`연결된 socket ID: ${socket.id}`);

        socket.on('join channel', (user: ConnectedUser | null) => {
            user && users.push(user);
            io.emit('update userlist', users);
        });

        socket.on('leave channel', () => {
            const user = users.find(user => user.socketId === socket.id);

            if (user) {
                users.splice(users.indexOf(user), 1);
                io.emit('update userlist', users);
            }
        });

        socket.on('request roomlist', () => {
            socket.emit('update roomlist', rooms);
        });

        socket.on('request room', (input: RoomCreateInputs, user: Player) => {
            const room = {
                ...input,
                id: roomRef++,
                title: input.title || '테트리스 같이 해요',
                players: [user],
                current: 1
            };

            rooms.push(room);
            socket.emit('create room', room);
            socket.broadcast.emit('update roomlist', rooms);
        });

        socket.on('send chat', (chat: Chat) => {
            io.emit('receive chat', chat);
        });

        socket.on('disconnect', () => {
            const user = users.find(user => user.socketId === socket.id);

            if (user) {
                users.splice(users.indexOf(user), 1);
                socket.broadcast.emit('update userlist', users);
            }
        });
    });

}
