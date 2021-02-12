import React from 'react';
import styled from 'styled-components';

const RoomLobbyEmptySlotBlock = styled.div`
    height: 11.5rem;
    border: 3px solid #E8E8E8;
    border-radius: 16px;
    background: #D3D7DB;
`;

function RoomLobbySlot() {
    return (
        <RoomLobbyEmptySlotBlock />
    );
}

export default RoomLobbySlot;