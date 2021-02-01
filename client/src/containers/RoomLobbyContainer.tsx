import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../modules';
import { setRoom, startGame } from '../modules/room';
import socket from '../socket';
import RoomLobby from '../components/RoomLobby';
import { Room } from '../../../server/src/socket/rooms';

function RoomLobbyContainer() {
    const room = useSelector((state: RootState) => state.room)!;
    const dispatch = useDispatch();

    const history = useHistory();

    const onStartGame = () => {
        socket.emit('request game');
    };

    const onReady = () => {
        socket.emit('toggle ready');
    };

    const onLeaveRoom = () => {
        socket.emit('leave room');
        dispatch(setRoom(null));
    };

    useEffect(() => {
        socket.on('update room', (room: Room) => {
            dispatch(setRoom(room));
        });

        socket.on('create game', () => {
            dispatch(startGame());
            history.push('/game');
        });

        return () => {
            socket.removeListener('update room');
            socket.removeListener('create game');
        }
    }, [dispatch, history])
    return (    
        <RoomLobby
            id={room.id}
            title={room.title}
            password={room.password}
            players={room.players}
            current={room.current}
            max={room.max}
            mode={room.mode}
            isStart={room.isStart}
            isReady={room.players.find(player => player.socketId === socket.id)!.isReady}
            isMaster={room.players.find(player => player.socketId === socket.id)!.isMaster}
            onStartGame={onStartGame}
            onReady={onReady}
            onLeaveRoom={onLeaveRoom}
        />
    );
}

export default RoomLobbyContainer;