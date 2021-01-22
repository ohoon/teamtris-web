import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import socket from '../socket';
import CreateRoomDialog from '../components/CreateRoomDialog';
import { hideDialog } from '../modules/dialog';
import { CreateRoomInputs } from '../socket/rooms';

const Wrapper = styled.div`
    position: absolute;
    left: 40%;
    top: 25%;
`;

function DialogContainer() {
    const { createRoom } = useSelector((state: RootState) => state.dialog);
    const me = useSelector((state: RootState) => state.users.me.data);
    const dispatch = useDispatch();

    const onClose = (name: string) => {
        dispatch(hideDialog(name));
    };

    const onCreateRoom = (input: CreateRoomInputs) => {
        const player = me && {
            socketId: socket.id,
            _id: me._id,
            username: me.username,
            nickname: me.nickname
        };

        socket.emit('request room', input, player);
    };

    return (
        <Wrapper>
            {createRoom &&
                <CreateRoomDialog
                    onClose={onClose}
                    onSubmit={onCreateRoom}
                />
            }
        </Wrapper>
    );
}

export default DialogContainer;