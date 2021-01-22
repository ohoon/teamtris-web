import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import socket from '../socket';
import { showDialog } from '../modules/dialog';
import RoomList from '../components/RoomList';
import { Room, Rooms } from '../../../server/src/socket/rooms';
import { setRoom } from '../modules/room';
import { RootState } from '../modules';

function RoomListContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);
    const dispatch = useDispatch();

    const history = useHistory();

    const [rooms, setRooms] = useState<Rooms>([]);

    const onJoinRoom = (roomId: number) => {
        if (!me) {
            alert('로그인이 필요합니다.');
            return history.push('/login');
        }

        const player = {
            socketId: socket.id,
            _id: me._id,
            username: me.username,
            nickname: me.nickname
        };

        socket.emit('join room', roomId, player);
    };

    const onCreateRoom = () => {
        if (!me) {
            alert('로그인이 필요합니다.');
            return history.push('/login');
        }

        dispatch(showDialog('createRoom'));
    };

    useEffect(() => {
        socket.on('update roomlist', (rooms: Rooms) => {
            setRooms(rooms);
        });

        socket.on('enter room', (room: Room) => {
            dispatch(setRoom(room));
        });

        socket.on('create room', (room: Room) => {
            dispatch(setRoom(room));
        });

        socket.emit('request roomlist');
        
        return () => {
            socket.removeListener('update roomlist');
            socket.removeListener('enter room');
            socket.removeListener('create room');
        };
    }, [dispatch]);
    
    return (
        <RoomList
            rooms={rooms}
            onJoinRoom={onJoinRoom}
            onCreateRoom={onCreateRoom}
        />
    );
}

export default RoomListContainer;