import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import socket from '../socket';
import RoomLobby from '../components/RoomLobby';
import { Room } from '../../../server/src/socket/io';
import { setRoom } from '../modules/room';

function RoomLobbyContainer() {
    const room = useSelector((state: RootState) => state.room);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('update room', (room: Room) => {
            dispatch(setRoom(room));
        });

        return () => {
            socket.removeListener('update room');
        }
    }, [dispatch])
    return (
        <>
            {room &&            
                <RoomLobby
                    id={room.id}
                    title={room.title}
                    password={room.password}
                    players={room.players}
                    current={room.current}
                    max={room.max}
                    mode={room.mode}
                />
            }
        </>
    );
}

export default RoomLobbyContainer;