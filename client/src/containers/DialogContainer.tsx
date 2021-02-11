import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import socket from '../socket';
import CreateRoomDialog from '../components/CreateRoomDialog';
import GameResultDialog from '../components/GameResultDialog';
import { hideDialog, showDialog } from '../modules/dialog';
import { CreateRoomInputs } from '../socket/rooms';
import { Player } from '../../../server/src/socket/users';

const Wrapper = styled.div`
    position: absolute;
    left: 40%;
    top: 25%;
    z-index: 100;
`;

function DialogContainer() {
    const { createRoom, gameResult } = useSelector((state: RootState) => state.dialog);
    const me = useSelector((state: RootState) => state.users.me.data);
    const dispatch = useDispatch();

    const [players, setPlayers] = useState<Player>({});

    const onClose = (name: string) => {
        dispatch(hideDialog(name));
    };

    const onCreateRoom = (input: CreateRoomInputs) => {
        const player = me && {
            [socket.id]: {
                _id: me._id,
                username: me.username,
                nickname: me.nickname,
                isReady: true,
                isMaster: true
            }
        };

        socket.emit('request room', input, player);
    };

    useEffect(() => {
        socket.on('end game', (players: Player) => {
            setPlayers(players);
            dispatch(showDialog('gameResult'));
        });
        
        return () => {
            socket.removeListener('end game');
        }
    }, [dispatch]);

    return (
        <Wrapper>
            {createRoom &&
                <CreateRoomDialog
                    onClose={onClose}
                    onSubmit={onCreateRoom}
                />
            }
            {gameResult &&
                <GameResultDialog
                    onClose={onClose}
                    players={players}
                />
            }
        </Wrapper>
    );
}

export default DialogContainer;