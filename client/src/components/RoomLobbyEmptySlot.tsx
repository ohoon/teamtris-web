import React, { memo } from 'react';
import { StyledRoomEmptySlot } from './styled/StyledRoom';

function RoomLobbySlot() {
    return (
        <StyledRoomEmptySlot />
    );
}

export default memo(RoomLobbySlot);