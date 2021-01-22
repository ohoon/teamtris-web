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
        socket.on('request room', (input, user) => {
            const room = Object.assign(Object.assign({}, input), { id: roomRef++, title: input.title || '테트리스 같이 해요', players: [user], current: 1 });
            rooms.push(room);
            socket.emit('create room', room);
            socket.broadcast.emit('update roomlist', rooms);
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
        });
    });
}
exports.default = createSocketIoServer;
//# sourceMappingURL=index.js.map