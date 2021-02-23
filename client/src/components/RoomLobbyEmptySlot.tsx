import React from 'react';
import styled from 'styled-components';

const RoomLobbyEmptySlotBlock = styled.div`
    height: 11.5rem;
    border: 1px solid #D8D8D8;
    border-radius: 16px;
    margin: 4px;
    background: #D5D9DE;
`;

function RoomLobbySlot() {
    return (
        <RoomLobbyEmptySlotBlock />
    );
}

export default RoomLobbySlot;