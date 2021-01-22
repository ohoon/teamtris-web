import React from 'react';
import styled from 'styled-components';
import { Room } from '../../../server/src/socket/rooms';

const RoomItemBlock = styled.div`
    display: flex;
    position: relative;
    padding: 16px;
    border: 3px solid #E8E8E8;
    border-radius: 20px;
    background: #D3D7DB;
    font-size: 16px;
`;

interface RoomItemProps extends Room {

}

function RoomItem({ id, title, current, max, mode }: RoomItemProps) {
    return (
        <RoomItemBlock>
            [{id}]
            [{mode}]
            {title}
            <br />
            {current} / {max}
        </RoomItemBlock>
    );
}

export default RoomItem;