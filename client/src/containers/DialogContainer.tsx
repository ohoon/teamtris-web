import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import socket from '../socket';
import RoomCreateDialog from '../components/RoomCreateDialog';
import { hideDialog } from '../modules/dialog';
import { RoomCreateInputs } from '../socket/rooms';

const Wrapper = styled.div`
    position: absolute;
    left: 40%;
    top: 25%;
`;

function DialogContainer() {
    const { roomCreate } = useSelector((state: RootState) => state.dialog);
    const me = useSelector((state: RootState) => state.users.me.data);
    const dispatch = useDispatch();

    const onClose = (name: string) => {
        dispatch(hideDialog(name));
    };

    const createRoom = (input: RoomCreateInputs) => {
        const user = me && {
            socketId: socket.id,
            _id: me._id,
            username: me.username,
            nickname: me.nickname
        };

        socket.emit('request room', input, user);
    };

    return (
        <Wrapper>
            {roomCreate &&
                <RoomCreateDialog
                    onClose={onClose}
                    onSubmit={createRoom}
                />
            }
        </Wrapper>
    );
}

export default DialogContainer;