import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../socket';
import { showDialog } from '../modules/dialog';
import RoomList from '../components/RoomList';
import { Rooms } from '../socket/rooms';

function RoomListContainer() {
    const dispatch = useDispatch();

    const [rooms, setRooms] = useState<Rooms>([]);

    const onRoomCreate = () => {
        dispatch(showDialog('roomCreate'));
    };

    useEffect(() => {
        socket.on('update roomlist', (rooms: Rooms) => {
            setRooms(rooms);
        });

        socket.emit('request roomlist');
        
        return () => {
            socket.removeListener('update roomlist');
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