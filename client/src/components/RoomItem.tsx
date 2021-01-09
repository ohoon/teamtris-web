import React from 'react';
import { Room } from '../modules/rooms';

interface RoomItemProps {
    room: Room;
}

function RoomItem({ room }: RoomItemProps) {
    return (
        <div
            className="item"
            key={room.id}
        >
            {room.title}
            <br />
            {room.current} / {room.max}
        </div>
    );
}

export default RoomItem;