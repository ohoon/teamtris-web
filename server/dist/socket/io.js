"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
function createSocketIoServer(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: 'http://localhost:5000'
        }
    });
    let chatRef = 1;
    io.on('connection', (socket) => {
        console.log(`연결된 socket ID: ${socket.id}`);
        socket.on('send chat', (chat) => {
            chat.id = chatRef++;
            io.emit('receive chat', chat);
        });
    });
}
exports.default = createSocketIoServer;
//# sourceMappingURL=io.js.map