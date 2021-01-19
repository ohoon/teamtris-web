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
    io.on('connection', (socket) => {
        console.log(`연결된 socket ID: ${socket.id}`);
        socket.on('join channel', (user) => {
            user && users.push(user);
            io.emit('update userlist', users);
        });
        socket.on('leave channel', (socketId) => {
            users = users.filter(user => user.socketId !== socketId);
            io.emit('update userlist', users);
        });
        socket.on('send chat', (chat) => {
            io.emit('receive chat', chat);
        });
    });
    io.on('disconnection', () => {
        console.log('연결 해제');
    });
}
exports.default = createSocketIoServer;
//# sourceMappingURL=io.js.map