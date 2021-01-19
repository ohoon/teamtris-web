import { Server } from 'http';
import { Server as socketIO } from 'socket.io';

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

    io.on('connection', (socket) => {
        console.log(`연결된 socket ID: ${socket.id}`);

        socket.on('send chat', (chat: Chat) => {
            io.emit('receive chat', chat);
        });
    });
}