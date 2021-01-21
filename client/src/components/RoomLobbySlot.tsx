import React from 'react';
import styled from 'styled-components';
import { Player } from '../../../server/src/socket/io';

const RoomLobbySlotBlock = styled.div`
    padding: 16px;
    border: 3px solid #E8E8E8;
    border-radius: 16px;
    background: #D3D7DB;
    font-size: 16px;
    text-align: center;
`;

interface RoomLobbySlotProps extends Player {

}

function RoomLobbySlot({ socketId, id, username, nickname }: RoomLobbySlotProps) {
    return (
        <RoomLobbySlotBlock>
            [{id}]
            <br />
            {username}({nickname})
        </RoomLobbySlotBlock>
    );
}

export default RoomLobbySlot;