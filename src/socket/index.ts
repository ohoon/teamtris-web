import { Server } from 'http';
import { Server as socketIO, Socket } from 'socket.io';
import { ConnectedUser, WaitingPlayer } from './users';
import { Game, Room } from './rooms';
import { Chat } from './chats';
import { Stage } from '../../client/src/tetris/stage';
import { RoomInputs, TEAM } from '../../client/src/socket/rooms';

interface CustomSocket extends Socket {
    currentRoomId?: number;
    currentTeam?: string;
}

export default function createSocketIoServer(server: Server) {
    const io = new socketIO(server, {
        cors: {
            origin: 'https://teamtris.herokuapp.com'
        }
    });

    let users: ConnectedUser = {};
    let rooms: Room = {};
    let games: Game = {};
    let roomRef = 1;

    io.on('connection', (socket: CustomSocket) => {
        console.log(`연결된 socket ID: ${socket.id}`);
        
        socket.on('join channel', (_user: ConnectedUser | null) => {
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

        socket.on('request room', (input: RoomInputs, player: WaitingPlayer) => {
            const roomId = roomRef++;

            if (input.mode === 'double') {
                player[socket.id].team = 'A';
            }

            const room = {
                [roomId]: {
                    ...input,
                    title: input.title || '테트리스 같이 해요',
                    players: player,
                    current: 1,
                    isStart: false
                }
            };
            
            Object.assign(rooms, room);
            socket.currentRoomId = roomId;
            socket.leave('channel');
            socket.join(`room${roomId}`);
            socket.emit('create room', { ...room[roomId], roomId: roomId });
            io.in('channel').emit('update roomlist', rooms);
        });

        socket.on('edit room', (input: RoomInputs, roomId: number) => {
            if (roomId in rooms) {
                const room = {
                    [roomId]: {
                        ...rooms[roomId],
                        ...input
                    }
                };

                if (rooms[roomId].current <= input.max) {
                    Object.assign(rooms, room);
                    io.in(`room${roomId}`).emit('update room', { ...rooms[roomId], roomId: roomId });
                    io.in('channel').emit('update roomlist', rooms);
                }
            }
        });

        socket.on('join room', (roomId: number, player: WaitingPlayer) => {
            if (roomId in rooms) {
                const room = rooms[roomId];
                const players = room.players;

                if (room.current < room.max && !room.isStart) {
                    if (room.mode === 'double') {
                        const teams = Object.keys(TEAM);

                        teams.some(team => {
                            if (Object.values(players).filter(player => player.team === team).length < 2) {
                                player[socket.id].team = team;
                                return true;
                            }
                        });
                    }

                    Object.assign(players, player);
                    room.current = Object.keys(players).length;
                    socket.currentRoomId = roomId;
                    socket.leave('channel');
                    socket.join(`room${roomId}`);
                    socket.emit('enter room', { ...room, roomId: roomId });
                    socket.to(`room${roomId}`).emit('update room', { ...room, roomId: roomId });
                    io.in('channel').emit('update roomlist', rooms);  
                }
            }
        });

        socket.on('change team', () => {
            const roomId = socket.currentRoomId;

            if (roomId && roomId in rooms) {
                const room = rooms[roomId];
                const players = room.players;

                if (socket.id in players) {
                    const me = players[socket.id];
                    
                    if (me.team) {
                        const teams = Object.keys(TEAM);

                        for (let i = 1; i < teams.length; i++) {
                            const myTeam: string = teams[(teams.indexOf(me.team) + i) % teams.length];
                            
                            if (Object.values(players).filter(player => player.team === myTeam).length < 2) {
                                me.team = myTeam;
                                break;
                            }
                        }
                    }

                    io.in(`room${roomId}`).emit('update room', { ...room, roomId: roomId });
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
                        
                        socket.to(`room${roomId}`).emit('update room', { ...room, roomId: roomId });
                    } else {
                        delete rooms[roomId];
                        delete games[roomId];
                    }
                    
                    socket.currentRoomId = undefined;
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
                
                if (
                    (
                        (
                            room.mode === 'single' &&
                            Object.keys(players).length > 1
                        ) ||
                        (
                            room.mode === 'double' &&
                            new Set(Object.values(players).map(player => player.team)).size > 1 ||
                            Object.keys(players).length === 2 * new Set(Object.values(players).map(player => player.team)).size
                        )
                    ) &&
                    !Object.values(players).find(player => player.isReady === false)
                ) {
                    const game = {
                        [roomId]: Object.entries(players).reduce((res, [socketId, player]) => ({
                            ...res,
                            [socketId]: {
                                _id: player._id,
                                nickname: player.nickname,
                                team: player.team
                            }
                        }), {})
                    };
                    
                    room.isStart = true;
                    Object.values(players).forEach(player => player.isMaster ? null : player.isReady = !player.isReady);
                    io.in(`room${roomId}`).emit('update room', { ...room, roomId: roomId });
                    io.in('channel').emit('update roomlist', rooms);

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
                    io.in(`room${roomId}`).emit('update room', { ...room, roomId: roomId });
                }
            }
        });

        socket.on('kick player', (socketId) => {
            io.to(socketId).emit('you are kicked');
        });

        socket.on('tetris is loaded', (stage: Stage) => {
            const roomId = socket.currentRoomId;
            
            if (roomId && roomId in games) {
                const game = games[roomId];
                
                if (socket.id in game) {
                    const me = game[socket.id];

                    me.stage = stage;
                    me.gameOver = false;

                    if (me.team) {
                        socket.currentTeam = me.team;
                    }

                    socket.to(`room${roomId}`).emit('update game', game);

                    if (!Object.values(game).find(player => player.stage === undefined || player.gameOver === undefined)) {
                        io.in(`room${roomId}`).emit('start game');
                    }
                }
            }
        });

        socket.on('tetromino is collided', (stage: Stage) => {
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

        socket.on('garbage attack', (garbage: number) => {
            const roomId = socket.currentRoomId;
            const team = socket.currentTeam;
            
            if (roomId && roomId in games) {
                const game = games[roomId];
                const others = Object.keys(game).filter(socketId =>
                    (!team || team !== game[socketId].team) &&
                    !game[socketId].gameOver &&
                    socketId !== socket.id)
                ;
                const target = others[Math.floor(Math.random() * others.length)];

                io.to(target).emit('someone attack you', garbage);
            }
        });

        socket.on('retire game', () => {
            const roomId = socket.currentRoomId;
            const team = socket.currentTeam;
            
            if (roomId && roomId in rooms && roomId in games) {
                const room = rooms[roomId];
                const game = games[roomId];
                const alivePlayers = Object.entries(game).filter(([socketId, player]) => socketId !== socket.id && player.gameOver === false);
                const grade = alivePlayers.length + 1;
                
                if (socket.id in game) {
                    const me = game[socket.id];

                    me.gameOver = true;
                    me.grade = grade;
                    
                    if (team) {
                        socket.currentTeam = undefined;
                    }

                    socket.to(`room${roomId}`).emit('update game', game);
                    socket.emit('send grade', grade);
                }

                if (alivePlayers.length == 2 && room.mode === 'double' && alivePlayers[0][1].team === alivePlayers[1][1].team) {
                    const winners = [alivePlayers[0][0], alivePlayers[1][0]];

                    winners.forEach(winner => {
                        io.to(winner).emit('you are won');
                    });
                }

                if (alivePlayers.length == 1) {
                    const winner = alivePlayers[0][0];
                    io.to(winner).emit('you are won');
                }
            }
        });

        socket.on('win a game', () => {
            const roomId = socket.currentRoomId;
            const team = socket.currentTeam;
            
            if (roomId && roomId in rooms && roomId in games) {
                const room = rooms[roomId];
                const game = games[roomId];
                
                if (socket.id in game) {
                    const me = game[socket.id];

                    me.gameOver = true;
                    me.grade = 1;
                    
                    if (team) {
                        socket.currentTeam = undefined;
                    }

                    socket.to(`room${roomId}`).emit('update game', game);
                    socket.emit('send grade', 1);
                    
                    room.isStart = false;
                    io.in(`room${roomId}`).emit('update room', { ...room, roomId: roomId });
                    io.in('channel').emit('update roomlist', rooms);

                    io.in(`room${roomId}`).emit('end game', game);
                }
            }
        });

        socket.on('send chat', (chat: Chat, target: string) => {
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
                        
                        socket.to(`room${roomId}`).emit('update room', { ...room, roomId: roomId });
                    } else {
                        delete rooms[roomId];
                        delete games[roomId];
                    }

                    socket.to('channel').emit('update roomlist', rooms);
                }
            }
        });
    });

}
