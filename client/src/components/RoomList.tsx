import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { Rooms } from '../modules/rooms';
import RoomItem from '../components/RoomItem';

const RoomListBlock = styled.div`
    width: 80%;
    height: 400px;
    padding: 10px;
    border: 3px solid #E8E8E8;
    background: #EEEEEE;
    overflow-x: hidden;
    overflow-y: auto;
`;

interface RoomListProps {
    rooms: Rooms
}

function RoomList({ rooms }: RoomListProps) {
    const gridRooms: Rooms[] = [];
    for (let i = 0; i < rooms.length; i= i + 2) {
        gridRooms.push(rooms.slice(i, i + 2));
    }
    
    return (
        <RoomListBlock>
            {gridRooms.map(row =>
                <Row>
                    {row.map(col =>
                        <Col>
                            <RoomItem
                                room={col}
                            />
                        </Col>
                    )}
                </Row>
            )}
        </RoomListBlock>
    );
}

export default RoomList;