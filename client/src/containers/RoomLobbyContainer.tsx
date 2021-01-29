import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { setRoom } from '../modules/room';
import socket from '../socket';
import RoomLobby from '../components/RoomLobby';
import { Room } from '../../../server/src/socket/rooms';

function RoomLobbyContainer() {
    const room = useSelector((state: RootState) => state.room);
    const dispatch = useDispatch();

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
            alert('create!');
        });

        return () => {
            socket.removeListener('update room');
            socket.removeListener('create game');
        }
    }, [dispatch])
    return (
        <>
            {room &&            
                <RoomLobby
                    id={room.id}
                    title={room.title}
                    password={room.password}
                    master={room.master}
                    players={room.players}
                    current={room.current}
                    max={room.max}
                    mode={room.mode}
                    isMaster={room.master.socketId === socket.id}
                    onStartGame={onStartGame}
                    onReady={onReady}
                    onLeaveRoom={onLeaveRoom}
                />
            }
        </>
    );
}

export default RoomLobbyContainer;