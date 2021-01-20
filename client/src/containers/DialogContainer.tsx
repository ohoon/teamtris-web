import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket';
import RoomCreateDialog from '../components/RoomCreateDialog';
import { RootState } from '../modules';
import { hideDialog } from '../modules/dialog';
import { RoomCreateInputs } from '../socket/rooms';

const Wrapper = styled.div`
    position: absolute;
    left: 40%;
    top: 25%;
`;

function DialogContainer() {
    const { roomCreate } = useSelector((state: RootState) => state.dialog);
    const dispatch = useDispatch();

    const onClose = (name: string) => {
        dispatch(hideDialog(name));
    };

    const createRoom = (input: RoomCreateInputs) => {
        socket.emit('create room', input);
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