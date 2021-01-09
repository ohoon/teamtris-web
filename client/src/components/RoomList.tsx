import React from 'react';
import styled from 'styled-components';
import { Rooms } from '../modules/rooms';
import RoomItem from '../components/RoomItem';

const RoomListGridBlock = styled.div`
    display: grid;
    width: 80%;
    padding: 10px;
    border: 3px solid #E8E8E8;
    background: #EEEEEE;
    grid-template-rows: 150px;
    grid-template-columns: repeat(2, 1fr);

    .item {
        display: flex;
        position: relative;
        padding: 16px;
        border: 3px solid black;
        border-radius: 20px;
        box-sizing: border-box;
        font-size: 16px;
    }
`;

interface RoomListProps {
    rooms: Rooms
}

function RoomList({ rooms }: RoomListProps) {
    return (
        <RoomListGridBlock>
            {rooms.map(room =>
                <RoomItem
                    room={room}
                />
            )}
        </RoomListGridBlock>
    );
}

export default RoomList;