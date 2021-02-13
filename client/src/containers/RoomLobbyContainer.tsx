import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../modules';
import { setRoom } from '../modules/room';
import socket from '../socket';
import RoomLobby from '../components/RoomLobby';
import { CurrentRoom } from '../socket/rooms';

function RoomLobbyContainer() {
    const room = useSelector((state: RootState) => state.room)!;
    const dispatch = useDispatch();

    const history = useHistory();

    const onStartGame = () => {
        if (Object.keys(room.players).length === 1) {
            return alert('혼자서는 시작할 수 없습니다.');
        }
        
        if(Object.values(room.players).find(player => player.isReady === false)) {
            return alert('준비가 되지 않은 사용자가 있습니다.');
        }

        socket.emit('request game');
    };

    const onToggleReady = () => {
        socket.emit('toggle ready');
    };
    
    const onLeaveRoom = () => {
        socket.emit('leave room');
        dispatch(setRoom(null));
    };

    useEffect(() => {
        socket.on('update room', (room: CurrentRoom) => {
            dispatch(setRoom(room));
        });

        return () => {
            socket.removeListener('update room');
        }
    }, [dispatch]);

    useEffect(() => {
        socket.on('create game', () => {
            history.push('/game');
        });

        return () => {
            socket.removeListener('create game');
        }
    }, [history]);

    return (
        <RoomLobby
            roomId={room.roomId}
            title={room.title}
            password={room.password}
            players={room.players}
            current={room.current}
            max={room.max}
            mode={room.mode}
            isStart={room.isStart}
            isReady={socket.id in room.players ? room.players[socket.id].isReady : false}
            isMaster={socket.id in room.players ? room.players[socket.id].isMaster : false}
            onStartGame={onStartGame}
            onToggleReady={onToggleReady}
            onLeaveRoom={onLeaveRoom}
        />
    );
}

export default RoomLobbyContainer;