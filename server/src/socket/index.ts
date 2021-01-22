import { Server } from 'http';
import { Server as socketIO, Socket } from 'socket.io';
import { ConnectedUser, ConnectedUsers, Player } from './users';
import { Rooms } from './rooms';
import { Chat } from './chats';
import { CreateRoomInputs } from '../../../client/src/socket/rooms';

interface CustomSocket extends Socket {
    currentRoomId: number | null;
}

export default function createSocketIoServer(server: Server) {
    const io = new socketIO(server, {
        cors: {
            origin: 'http://localhost:5000'
        }
    });

    let users: ConnectedUsers = [];
    let rooms: Rooms = [];
    let roomRef = 1;

    io.on('connection', (socket: CustomSocket) => {
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

        socket.on('request room', (input: CreateRoomInputs, player: Player) => {
            const room = {
                ...input,
                id: roomRef++,
                title: input.title || '테트리스 같이 해요',
                players: [player],
                current: 1
            };

            rooms.push(room);
            socket.currentRoomId = room.id;
            socket.emit('create room', room);
            socket.broadcast.emit('update roomlist', rooms);
        });

        socket.on('join room', (roomId: number, player: Player) => {
            const room = rooms.find(room => room.id === roomId);

            if (room) {
                const roomIndex = rooms.indexOf(room);
                
                rooms[roomIndex].players.push(player);
                rooms[roomIndex].current = rooms[roomIndex].players.length;

                socket.currentRoomId = room.id;
                socket.emit('enter room', rooms[roomIndex]);
                socket.broadcast.emit('update room', rooms[roomIndex]);
            }
        });

        socket.on('leave room', () => {
            const room = rooms.find(room => room.id === socket.currentRoomId);

            if (room) {
                const roomIndex = rooms.indexOf(room);
                const players = room.players;
                const player = players.find(player => player.socketId === socket.id);

                if (player) {
                    if (players.length > 1) {
                        rooms[roomIndex].players.splice(players.indexOf(player), 1);
                        rooms[roomIndex].current = rooms[roomIndex].players.length;

                        socket.broadcast.emit('update room', rooms[roomIndex]);
                    } else {
                        rooms.splice(roomIndex, 1);
                    }
                    
                    socket.currentRoomId = null;
                    io.emit('update roomlist', rooms);
                }
            }
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

            const room = rooms.find(room => room.id === socket.currentRoomId);

            if (room) {
                const roomIndex = rooms.indexOf(room);
                const players = room.players;
                const player = players.find(player => player.socketId === socket.id);

                if (player) {
                    if (players.length > 1) {
                        rooms[roomIndex].players.splice(players.indexOf(player), 1);
                        rooms[roomIndex].current = rooms[roomIndex].players.length;

                        socket.broadcast.emit('update room', rooms[roomIndex]);
                    } else {
                        rooms.splice(roomIndex, 1);
                    }
                    
                    socket.currentRoomId = null;
                    socket.broadcast.emit('update roomlist', rooms);
                }
            }
        });
    });

}
