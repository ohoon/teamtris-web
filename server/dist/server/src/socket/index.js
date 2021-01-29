"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
function createSocketIoServer(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: 'http://localhost:5000'
        }
    });
    let users = [];
    let rooms = [];
    let roomRef = 1;
    io.on('connection', (socket) => {
        console.log(`연결된 socket ID: ${socket.id}`);
        socket.on('join channel', (user) => {
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
        socket.on('request room', (input, player) => {
            const room = Object.assign(Object.assign({}, input), { id: roomRef++, title: input.title || '테트리스 같이 해요', master: player, players: [player], current: 1 });
            rooms.push(room);
            socket.currentRoomId = room.id;
            socket.join(`room${room.id}`);
            socket.emit('create room', room);
            socket.broadcast.emit('update roomlist', rooms);
        });
        socket.on('join room', (roomId, player) => {
            const room = rooms.find(room => room.id === roomId);
            if (room) {
                const roomIndex = rooms.indexOf(room);
                if (rooms[roomIndex].current < rooms[roomIndex].max) {
                    rooms[roomIndex].players.push(player);
                    rooms[roomIndex].current = rooms[roomIndex].players.length;
                    socket.currentRoomId = room.id;
                    socket.join(`room${room.id}`);
                    socket.emit('enter room', rooms[roomIndex]);
                    socket.broadcast.emit('update room', rooms[roomIndex]);
                }
            }
        });
        socket.on('leave room', () => {
            const currentRoomId = socket.currentRoomId;
            const room = rooms.find(room => room.id === currentRoomId);
            if (currentRoomId && room) {
                const roomIndex = rooms.indexOf(room);
                const players = room.players;
                const me = players.find(player => player.socketId === socket.id);
                if (me) {
                    if (players.length > 1) {
                        if (rooms[roomIndex].master === me) {
                            const candidate = players.filter(player => player !== me);
                            rooms[roomIndex].master = candidate[0];
                            rooms[roomIndex].players[players.indexOf(candidate[0])].isReady = true;
                        }
                        rooms[roomIndex].players.splice(players.indexOf(me), 1);
                        rooms[roomIndex].current = rooms[roomIndex].players.length;
                        socket.broadcast.emit('update room', rooms[roomIndex]);
                    }
                    else {
                        rooms.splice(roomIndex, 1);
                    }
                    socket.currentRoomId = null;
                    socket.leave(`room${currentRoomId}`);
                    io.emit('update roomlist', rooms);
                }
            }
        });
        socket.on('request game', () => {
            const currentRoomId = socket.currentRoomId;
            const room = rooms.find(room => room.id === currentRoomId);
            if (currentRoomId && room) {
                const players = room.players;
                if (!players.find(player => player.isReady === false)) {
                    io.emit('create game');
                }
            }
        });
        socket.on('toggle ready', () => {
            const currentRoomId = socket.currentRoomId;
            const room = rooms.find(room => room.id === currentRoomId);
            if (currentRoomId && room) {
                const roomIndex = rooms.indexOf(room);
                const players = room.players;
                const me = players.find(player => player.socketId === socket.id);
                if (me) {
                    const meIndex = players.indexOf(me);
                    rooms[roomIndex].players[meIndex].isReady = !rooms[roomIndex].players[meIndex].isReady;
                    io.emit('update room', rooms[roomIndex]);
                }
            }
        });
        socket.on('send chat', (chat) => {
            io.emit('receive chat', chat);
        });
        socket.on('disconnect', () => {
            const user = users.find(user => user.socketId === socket.id);
            if (user) {
                users.splice(users.indexOf(user), 1);
                socket.broadcast.emit('update userlist', users);
            }
            const curretnRoomId = socket.currentRoomId;
            const room = rooms.find(room => room.id === curretnRoomId);
            if (curretnRoomId && room) {
                const roomIndex = rooms.indexOf(room);
                const players = room.players;
                const me = players.find(player => player.socketId === socket.id);
                if (me) {
                    if (players.length > 1) {
                        if (rooms[roomIndex].master === me) {
                            const candidate = players.filter(player => player !== me);
                            rooms[roomIndex].master = candidate[0];
                            rooms[roomIndex].players[players.indexOf(candidate[0])].isReady = true;
                        }
                        rooms[roomIndex].players.splice(players.indexOf(me), 1);
                        rooms[roomIndex].current = rooms[roomIndex].players.length;
                        socket.broadcast.emit('update room', rooms[roomIndex]);
                    }
                    else {
                        rooms.splice(roomIndex, 1);
                    }
                    socket.currentRoomId = null;
                    socket.leave(`room${curretnRoomId}`);
                    socket.broadcast.emit('update roomlist', rooms);
                }
            }
        });
    });
}
exports.default = createSocketIoServer;
//# sourceMappingURL=index.js.map