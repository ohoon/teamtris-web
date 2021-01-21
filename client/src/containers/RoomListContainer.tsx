import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../socket';
import { showDialog } from '../modules/dialog';
import RoomList from '../components/RoomList';
import { Room } from '../../../server/src/socket/io';
import { setRoom } from '../modules/room';

function RoomListContainer() {
    const dispatch = useDispatch();

    const [rooms, setRooms] = useState<Room[]>([]);

    const onRoomCreate = () => {
        dispatch(showDialog('roomCreate'));
    };

    useEffect(() => {
        socket.on('update roomlist', (rooms: Room[]) => {
            setRooms(rooms);
        });

        socket.on('create room', (room: Room) => {
            dispatch(setRoom(room));
        });

        socket.emit('request roomlist');
        
        return () => {
            socket.removeListener('update roomlist');
            socket.removeListener('create room');
        };
    }, []);
    
    return (
        <RoomList
            rooms={rooms}
            onRoomCreate={onRoomCreate}
        />
    );
}

export default RoomListContainer;