import React from 'react';
import styled from 'styled-components';
import { Room } from '../modules/rooms';

const RoomItemBlock = styled.div`
    display: flex;
    position: relative;
    padding: 16px;
    border: 3px solid #E8E8E8;
    border-radius: 20px;
    background: #D3D7DB;
    font-size: 16px;
`;

interface RoomItemProps {
    room: Room;
}

function RoomItem({ room }: RoomItemProps) {
    return (
        <RoomItemBlock
            key={room.id}
        >
            {room.title}
            <br />
            {room.current} / {room.max}
        </RoomItemBlock>
    );
}

export default RoomItem;