import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import socket from '../socket';
import { showDialog } from '../modules/dialog';
import RoomList from '../components/RoomList';
import { Room } from '../../../server/src/socket/rooms';
import { setRoom } from '../modules/room';
import { RootState } from '../modules';

function RoomListContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);
    const dispatch = useDispatch();

    const history = useHistory();

    const [rooms, setRooms] = useState<Room[]>([]);

    const onCreateRoom = () => {
        if (!me) {
            alert('로그인이 필요합니다.');
            return history.push('/login');
        }

        dispatch(showDialog('createRoom'));
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
    }, [dispatch]);
    
    return (
        <RoomList
            rooms={rooms}
            onCreateRoom={onCreateRoom}
        />
    );
}

export default RoomListContainer;