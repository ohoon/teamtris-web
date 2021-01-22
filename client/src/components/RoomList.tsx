import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'react-bootstrap';
import { Rooms } from '../../../server/src/socket/rooms';
import RoomItem from '../components/RoomItem';

const RoomListBlock = styled.div`
    .head {
        padding: 1px 10px 1px 10px;
        border: 3px solid #E8E8E8;
        background: #D3D7DB;
        font-weight: bold;
        font-size: 12px;
    }

    .body {
        height: 400px;
        margin: 0 auto;
        padding: 10px;
        border: 3px solid #E8E8E8;
        background: #EEEEEE;
        overflow-x: hidden;
        overflow-y: auto;
    }
    
    .menu {
        margin: auto;
    }
`;

const RoomCreateButton = styled(Button)`
    
`;

interface RoomListProps {
    rooms: Rooms;
    onRoomCreate: () => void;
}

function RoomList({ rooms, onRoomCreate }: RoomListProps) {
    const gridRooms: Rooms[] = [];
    for (let i = 0; i < rooms.length; i= i + 2) {
        gridRooms.push(rooms.slice(i, i + 2));
    }
    
    return (
        <RoomListBlock>
            <div
                className="head"
            >
                방 목록 ({rooms.length}개)
            </div>
            <div
                className="body"
            >
                {gridRooms.map((row, index) =>
                    <Row
                        key={index + 1}
                    >
                        {row.map((col, index) =>
                            <Col
                                key={index + 1}
                                md={6}
                            >
                                <RoomItem
                                    id={col.id}
                                    title={col.title}
                                    password={col.password}
                                    players={col.players}
                                    current={col.current}
                                    max={col.max}
                                    mode={col.mode}
                                />
                            </Col>
                        )}
                    </Row>
                )}
            </div>
            <div
                className="menu"
            >
                <RoomCreateButton
                    variant="dark"
                    size="sm"
                    onClick={onRoomCreate}
                >
                    방 만들기
                </RoomCreateButton>
            </div>
        </RoomListBlock>
    );
}

export default RoomList;