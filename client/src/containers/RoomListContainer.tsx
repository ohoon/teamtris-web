import React from 'react';
import RoomList from '../components/RoomList';
import { Rooms } from '../socket/rooms';

const roomTemplate: Rooms = [];

function RoomListContainer() {
    return (
        <RoomList
            rooms={roomTemplate}
        />
    );
}

export default RoomListContainer;