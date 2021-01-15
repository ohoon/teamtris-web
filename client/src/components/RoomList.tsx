import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { Rooms } from '../socket/rooms';
import RoomItem from '../components/RoomItem';

const RoomListBlock = styled.div`
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
                <Row
                    key={row[0].id}
                >
                    {row.map(col =>
                        <Col
                            key={col.id}
                        >
                            <RoomItem
                                id={col.id}
                                title={col.title}
                                password={col.password}
                                participant={col.participant}
                                current={col.current}
                                max={col.max}
                                mode={col.mode}
                                isLock={col.isLock}
                            />
                        </Col>
                    )}
                </Row>
            )}
        </RoomListBlock>
    );
}

export default RoomList;