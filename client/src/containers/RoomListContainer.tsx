import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import socket from '../socket';
import { showDialog } from '../modules/dialog';
import RoomList from '../components/RoomList';
import { Room } from '../../../src/socket/rooms';
import { setRoom } from '../modules/room';
import { RootState } from '../modules';
import { CurrentRoom } from '../socket/rooms';

function RoomListContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);
    const dispatch = useDispatch();

    const history = useHistory();

    const [roomlist, setRoomList] = useState<Room>({});

    const onJoinRoom = (roomId: number) => {
        if (!me) {
            alert('로그인이 필요합니다.');
            return history.push('/login');
        }

        const player = {
            [socket.id]: {
                _id: me._id,
                nickname: me.nickname,
                profileImage: me.profileImage,
                isReady: false,
                isMaster: false
            }
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

    const goToPractice = () => {
        history.push('/practice');
    };

    useEffect(() => {
        socket.on('update roomlist', (rooms: Room) => {
            setRoomList(rooms);
        });

        socket.on('enter room', (room: CurrentRoom) => {
            dispatch(setRoom(room));
        });

        socket.on('create room', (room: CurrentRoom) => {
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
            rooms={roomlist}
            onJoinRoom={onJoinRoom}
            onCreateRoom={onCreateRoom}
            goToPractice={goToPractice}
        />
    );
}

export default memo(RoomListContainer);