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
    let games = [];
    let roomRef = 1;
    io.on('connection', (socket) => {
        console.log(`연결된 socket ID: ${socket.id}`);
        socket.on('join channel', (user) => {
            user && users.push(Object.assign(Object.assign({}, user), { socketId: socket.id }));
            socket.join('channel');
            io.in('channel').emit('update userlist', users);
        });
        socket.on('leave channel', () => {
            const user = users.find(user => user.socketId === socket.id);
            if (user) {
                users.splice(users.indexOf(user), 1);
                io.in('channel').emit('update userlist', users);
            }
        });
        socket.on('request roomlist', () => {
            socket.emit('update roomlist', rooms);
        });
        socket.on('request room', (input, player) => {
            const room = Object.assign(Object.assign({}, input), { id: roomRef++, title: input.title || '테트리스 같이 해요', players: [player], current: 1, isStart: false });
            rooms.push(room);
            socket.currentRoomId = room.id;
            socket.leave('channel');
            socket.join(`room${room.id}`);
            socket.emit('create room', room);
            io.in('channel').emit('update roomlist', rooms);
        });
        socket.on('join room', (roomId, player) => {
            const room = rooms.find(room => room.id === roomId);
            if (room) {
                const roomIndex = rooms.indexOf(room);
                if (rooms[roomIndex].current < rooms[roomIndex].max) {
                    rooms[roomIndex].players.push(player);
                    rooms[roomIndex].current = rooms[roomIndex].players.length;
                    socket.currentRoomId = room.id;
                    socket.leave('channel');
                    socket.join(`room${room.id}`);
                    socket.emit('enter room', rooms[roomIndex]);
                    socket.to(`room${room.id}`).emit('update room', rooms[roomIndex]);
                    io.in('channel').emit('update roomlist', rooms);
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
                        if (me.isMaster) {
                            rooms[roomIndex].players[players.findIndex(player => player !== me)].isMaster = true;
                            rooms[roomIndex].players[players.findIndex(player => player !== me)].isReady = true;
                        }
                        rooms[roomIndex].players.splice(players.indexOf(me), 1);
                        rooms[roomIndex].current = rooms[roomIndex].players.length;
                        socket.broadcast.emit('update room', rooms[roomIndex]);
                    }
                    else {
                        rooms.splice(roomIndex, 1);
                    }
                    socket.currentRoomId = null;
                    socket.leave(`room${room.id}`);
                    io.in('channel').emit('update roomlist', rooms);
                }
            }
        });
        socket.on('request game', () => {
            const currentRoomId = socket.currentRoomId;
            const room = rooms.find(room => room.id === currentRoomId);
            if (currentRoomId && room) {
                const players = room.players;
                if (!players.find(player => player.isReady === false)) {
                    const game = {
                        roomId: room.id,
                        players: players.map(player => ({
                            socketId: player.socketId,
                            _id: player._id,
                            username: player.username,
                            nickname: player.nickname
                        }))
                    };
                    games.push(game);
                    io.in(`room${room.id}`).emit('create game');
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
                    io.in(`room${room.id}`).emit('update room', rooms[roomIndex]);
                }
            }
        });
        socket.on('tetris is loaded', (stage) => {
            const currentRoomId = socket.currentRoomId;
            const game = games.find(game => game.roomId === currentRoomId);
            if (currentRoomId && game) {
                const gameIndex = games.indexOf(game);
                const players = game.players;
                const me = players.find(player => player.socketId === socket.id);
                if (me) {
                    const meIndex = players.indexOf(me);
                    games[gameIndex].players[meIndex].stage = stage;
                    games[gameIndex].players[meIndex].gameOver = false;
                    socket.to(`room${game.roomId}`).emit('update game', games[gameIndex]);
                    if (!games[gameIndex].players.find(player => player.stage === undefined || player.gameOver === undefined)) {
                        io.in(`room${game.roomId}`).emit('start game');
                    }
                }
            }
        });
        socket.on('tetromino is collided', (stage) => {
            const currentRoomId = socket.currentRoomId;
            const game = games.find(game => game.roomId === currentRoomId);
            if (currentRoomId && game) {
                const gameIndex = games.indexOf(game);
                const players = game.players;
                const me = players.find(player => player.socketId === socket.id);
                if (me) {
                    const meIndex = players.indexOf(me);
                    games[gameIndex].players[meIndex].stage = stage;
                    socket.to(`room${game.roomId}`).emit('update game', games[gameIndex]);
                }
            }
        });
        socket.on('garbage attack', (garbage) => {
            const currentRoomId = socket.currentRoomId;
            const game = games.find(game => game.roomId === currentRoomId);
            if (currentRoomId && game) {
                const otherPlayers = game.players.filter(player => player.socketId !== socket.id);
                const target = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
                io.to(target.socketId).emit('someone attack you', garbage);
            }
        });
        socket.on('end game', () => {
            const currentRoomId = socket.currentRoomId;
            const game = games.find(game => game.roomId === currentRoomId);
            if (currentRoomId && game) {
                const gameIndex = games.indexOf(game);
                const players = game.players;
                const alivePlayers = players.filter(player => player.socketId !== socket.id && player.gameOver === false);
                const grade = alivePlayers.length + 1;
                const me = players.find(player => player.socketId === socket.id);
                if (me) {
                    const meIndex = players.indexOf(me);
                    games[gameIndex].players[meIndex].gameOver = true;
                    games[gameIndex].players[meIndex].grade = grade;
                    socket.to(`room${game.roomId}`).emit('update game', games[gameIndex]);
                    socket.emit('send game result', grade);
                }
                if (alivePlayers.length == 1) {
                    io.to(alivePlayers[0].socketId).emit('you are won');
                }
            }
        });
        socket.on('send chat', (chat, target) => {
            io.in(target).emit('receive chat', chat);
        });
        socket.on('disconnect', () => {
            const user = users.find(user => user.socketId === socket.id);
            if (user) {
                users.splice(users.indexOf(user), 1);
                socket.to('channel').emit('update userlist', users);
            }
            const currentRoomId = socket.currentRoomId;
            const room = rooms.find(room => room.id === currentRoomId);
            const game = games.find(game => game.roomId === currentRoomId);
            if (currentRoomId && game) {
                const gameIndex = games.indexOf(game);
                const players = game.players;
                const alivePlayers = players.filter(player => player.socketId !== socket.id && player.gameOver === false);
                const grade = alivePlayers.length + 1;
                const me = players.find(player => player.socketId === socket.id);
                if (me) {
                    const meIndex = players.indexOf(me);
                    games[gameIndex].players[meIndex].gameOver = true;
                    games[gameIndex].players[meIndex].grade = grade;
                    socket.to(`room${game.roomId}`).emit('update game', games[gameIndex]);
                    socket.emit('send game result', grade);
                }
                if (alivePlayers.length == 1) {
                    io.to(alivePlayers[0].socketId).emit('you are won');
                }
            }
            if (currentRoomId && room) {
                const roomIndex = rooms.indexOf(room);
                const players = room.players;
                const me = players.find(player => player.socketId === socket.id);
                if (me) {
                    if (players.length > 1) {
                        if (me.isMaster) {
                            rooms[roomIndex].players[players.findIndex(player => player !== me)].isMaster = true;
                            rooms[roomIndex].players[players.findIndex(player => player !== me)].isReady = true;
                        }
                        rooms[roomIndex].players.splice(players.indexOf(me), 1);
                        rooms[roomIndex].current = rooms[roomIndex].players.length;
                        socket.to(`room${room.id}`).emit('update room', rooms[roomIndex]);
                    }
                    else {
                        rooms.splice(roomIndex, 1);
                    }
                    socket.currentRoomId = null;
                    socket.leave(`room${room.id}`);
                    socket.to('channel').emit('update roomlist', rooms);
                }
            }
        });
    });
}
exports.default = createSocketIoServer;
//# sourceMappingURL=index.js.map