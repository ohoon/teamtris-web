import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Player } from '../../../server/src/socket/users';
import socket from '../socket';
import { RoomInputs } from '../socket/rooms';
import { User, getUsers } from '../api/users';
import { applyResult } from '../api/game';
import { RootState } from '../modules';
import { hideDialog, showDialog } from '../modules/dialog';
import { getMeThunk } from '../modules/users';
import CreateRoomDialog from '../components/CreateRoomDialog';
import EditRoomDialog from '../components/EditRoomDialog';
import GameResultDialog from '../components/GameResultDialog';
import RankingDialog from '../components/RankingDialog';
import { StyledDialogWrapper } from '../components/styled/StyledDialog';

function DialogContainer() {
    const { createRoom, editRoom, gameResult, ranking } = useSelector((state: RootState) => state.dialog);
    const me = useSelector((state: RootState) => state.users.me.data);
    const room = useSelector((state: RootState) => state.room);
    const dispatch = useDispatch();

    const [players, setPlayers] = useState<Player>({});
    const [users, setUsers] = useState<User[]>([]);

    const onClose = (name: string) => {
        dispatch(hideDialog(name));
    };

    const onCreateRoom = (input: RoomInputs) => {
        const player = me && {
            [socket.id]: {
                _id: me._id,
                nickname: me.nickname,
                profileImage: me.profileImage,
                isReady: true,
                isMaster: true
            }
        };

        socket.emit('request room', input, player);
    };

    const onEditRoom = (input: RoomInputs) => {
        if (room) {
            if (room.current > input.max) {
                return alert('현재 인원이 설정하려는 최대 인원보다 큽니다.');
            }
            
            socket.emit('edit room', input, room.roomId);
        }
    };

    const onApplyResult = async () => {
        await applyResult(players[socket.id].grade! === 1, 100 * (Object.keys(players).length / players[socket.id].grade!));
        dispatch(getMeThunk());
    };

    useEffect(() => {
        socket.on('end game', (players: Player) => {
            setPlayers(players);
            dispatch(showDialog('gameResult'));
        });
    });

    useEffect(() => {
        if (ranking) {
            (async () => {
                try {
                    const result = await getUsers();
                    if (!result.success) {
                        throw new Error(result.message);
                    }

                    setUsers(result.data);
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [ranking]);

    return (
        <StyledDialogWrapper>
            {createRoom &&
                <CreateRoomDialog
                    onClose={onClose}
                    onSubmit={onCreateRoom}
                />
            }
            {editRoom && room &&
                <EditRoomDialog
                    room={room}
                    onClose={onClose}
                    onSubmit={onEditRoom}
                />
            }
            {gameResult && room &&
                <GameResultDialog
                    players={players}
                    mode={room.mode}
                    onApplyResult={onApplyResult}
                    onClose={onClose}
                />
            }
            {ranking &&
                <RankingDialog
                    users={users}
                    onClose={onClose}
                />
            }
        </StyledDialogWrapper>
    );
}

export default memo(DialogContainer);