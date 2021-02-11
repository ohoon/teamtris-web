"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
function createSocketIoServer(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: 'http://localhost:5000'
        }
    });
    let users = {};
    let rooms = {};
    let games = {};
    let roomRef = 1;
    io.on('connection', (socket) => {
        console.log(`연결된 socket ID: ${socket.id}`);
        socket.on('join channel', (_user) => {
            if (_user) {
                const user = {
                    [socket.id]: _user
                };
                Object.assign(users, user);
            }
            socket.join('channel');
            io.in('channel').emit('update userlist', users);
        });
        socket.on('leave channel', () => {
            if (socket.id in users) {
                delete users[socket.id];
                io.in('channel').emit('update userlist', users);
            }
        });
        socket.on('request roomlist', () => {
            socket.emit('update roomlist', rooms);
        });
        socket.on('request room', (input, player) => {
            const roomId = roomRef++;
            const room = {
                [roomId]: Object.assign(Object.assign({}, input), { title: input.title || '테트리스 같이 해요', players: player, current: 1, isStart: false })
            };
            Object.assign(rooms, room);
            socket.currentRoomId = roomId;
            socket.leave('channel');
            socket.join(`room${roomId}`);
            socket.emit('create room', Object.assign(Object.assign({}, room[roomId]), { roomId: roomId }));
            io.in('channel').emit('update roomlist', rooms);
        });
        socket.on('join room', (roomId, player) => {
            if (roomId in rooms) {
                const room = rooms[roomId];
                if (room.current < room.max) {
                    Object.assign(room.players, player);
                    room.current = Object.keys(room.players).length;
                    socket.currentRoomId = roomId;
                    socket.leave('channel');
                    socket.join(`room${roomId}`);
                    socket.emit('enter room', Object.assign(Object.assign({}, room), { roomId: roomId }));
                    socket.to(`room${roomId}`).emit('update room', Object.assign(Object.assign({}, room), { roomId: roomId }));
                    io.in('channel').emit('update roomlist', rooms);
                }
            }
        });
        socket.on('leave room', () => {
            const roomId = socket.currentRoomId;
            if (roomId && roomId in rooms) {
                const room = rooms[roomId];
                const players = room.players;
                if (socket.id in players) {
                    const me = players[socket.id];
                    const otherId = Object.keys(players).find(socketId => socketId !== socket.id);
                    if (otherId) {
                        if (me.isMaster) {
                            players[otherId].isMaster = true;
                            players[otherId].isReady = true;
                        }
                        delete players[socket.id];
                        room.current = Object.keys(players).length;
                        socket.to(`room${roomId}`).emit('update room', Object.assign(Object.assign({}, room), { roomId: roomId }));
                    }
                    else {
                        delete rooms[roomId];
                    }
                    socket.currentRoomId = null;
                    socket.leave(`room${roomId}`);
                    io.in('channel').emit('update roomlist', rooms);
                }
            }
        });
        socket.on('request game', () => {
            const roomId = socket.currentRoomId;
            if (roomId && roomId in rooms) {
                const room = rooms[roomId];
                const players = room.players;
                if (!Object.values(players).find(player => player.isReady === false)) {
                    const game = {
                        [roomId]: Object.entries(players).reduce((res, [socketId, player]) => (Object.assign(Object.assign({}, res), { [socketId]: {
                                _id: player._id,
                                username: player.username,
                                nickname: player.nickname
                            } })), {})
                    };
                    room.isStart = true;
                    io.in(`room${roomId}`).emit('update room', Object.assign(Object.assign({}, room), { roomId: roomId }));
                    Object.assign(games, game);
                    io.in(`room${roomId}`).emit('create game');
                }
            }
        });
        socket.on('toggle ready', () => {
            const roomId = socket.currentRoomId;
            if (roomId && roomId in rooms) {
                const room = rooms[roomId];
                const players = room.players;
                if (socket.id in players) {
                    const me = players[socket.id];
                    me.isReady = !me.isReady;
                    io.in(`room${roomId}`).emit('update room', Object.assign(Object.assign({}, room), { roomId: roomId }));
                }
            }
        });
        socket.on('tetris is loaded', (stage) => {
            const roomId = socket.currentRoomId;
            if (roomId && roomId in games) {
                const game = games[roomId];
                if (socket.id in game) {
                    const me = game[socket.id];
                    me.stage = stage;
                    me.gameOver = false;
                    socket.to(`room${roomId}`).emit('update game', game);
                    if (!Object.values(game).find(player => player.stage === undefined || player.gameOver === undefined)) {
                        io.in(`room${roomId}`).emit('start game');
                    }
                }
            }
        });
        socket.on('tetromino is collided', (stage) => {
            const roomId = socket.currentRoomId;
            if (roomId && roomId in games) {
                const game = games[roomId];
                if (socket.id in game) {
                    const me = game[socket.id];
                    me.stage = stage;
                    socket.to(`room${roomId}`).emit('update game', game);
                }
            }
        });
        socket.on('garbage attack', (garbage) => {
            const roomId = socket.currentRoomId;
            if (roomId && roomId in games) {
                const game = games[roomId];
                const others = Object.keys(game).filter(socketId => socketId !== socket.id);
                const target = others[Math.floor(Math.random() * others.length)];
                io.to(target).emit('someone attack you', garbage);
            }
        });
        socket.on('end game', () => {
            const roomId = socket.currentRoomId;
            if (roomId && roomId in games) {
                const game = games[roomId];
                const alivePlayers = Object.entries(game).filter(([socketId, player]) => socketId !== socket.id && player.gameOver === false);
                const grade = alivePlayers.length + 1;
                if (socket.id in game) {
                    const me = game[socket.id];
                    me.gameOver = true;
                    me.grade = grade;
                    socket.to(`room${roomId}`).emit('update game', game);
                    socket.emit('send game result', grade);
                }
                if (alivePlayers.length == 1) {
                    io.to(alivePlayers[0][0]).emit('you are won');
                }
            }
        });
        socket.on('send chat', (chat, target) => {
            io.in(target).emit('receive chat', chat);
        });
        socket.on('disconnect', () => {
            if (socket.id in users) {
                delete users[socket.id];
                socket.to('channel').emit('update userlist', users);
            }
            const roomId = socket.currentRoomId;
            if (roomId && roomId in games) {
                const game = games[roomId];
                const alivePlayers = Object.entries(game).filter(([socketId, player]) => socketId !== socket.id && player.gameOver === false);
                const grade = alivePlayers.length + 1;
                if (socket.id in game) {
                    const me = game[socket.id];
                    me.gameOver = true;
                    me.grade = grade;
                    socket.to(`room${roomId}`).emit('update game', game);
                    socket.emit('send game result', grade);
                }
                if (alivePlayers.length == 1) {
                    io.to(alivePlayers[0][0]).emit('you are won');
                }
            }
            if (roomId && roomId in rooms) {
                const room = rooms[roomId];
                const players = room.players;
                if (socket.id in players) {
                    const me = players[socket.id];
                    const otherId = Object.keys(players).find(socketId => socketId !== socket.id);
                    if (otherId) {
                        if (me.isMaster) {
                            players[otherId].isMaster = true;
                            players[otherId].isReady = true;
                        }
                        delete players[socket.id];
                        room.current = Object.keys(players).length;
                        socket.to(`room${roomId}`).emit('update room', Object.assign(Object.assign({}, room), { roomId: roomId }));
                    }
                    else {
                        delete rooms[roomId];
                    }
                    socket.currentRoomId = null;
                    socket.leave(`room${roomId}`);
                    socket.to('channel').emit('update roomlist', rooms);
                }
            }
        });
    });
}
exports.default = createSocketIoServer;
//# sourceMappingURL=index.js.map