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
        display: flex;
        justify-content: flex-end;
        margin: auto;
    }
`;

const GoToPracticeButton = styled(Button)`

`;

const CreateRoomButton = styled(Button)`
    margin-left: 2px;  
`;

interface RoomListProps {
    rooms: Rooms;
    onJoinRoom: (roomId: number) => void;
    onCreateRoom: () => void;
    goToPractice: () => void;
}

function RoomList({ rooms, onJoinRoom, onCreateRoom, goToPractice }: RoomListProps) {
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
                <Row
                    lg={2}
                    md={2}
                    sm={1}
                    xs={1}
                >
                    {rooms.map((room, index) =>
                        <Col
                            key={index + 1}
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                        >
                            <RoomItem
                                id={room.id}
                                title={room.title}
                                password={room.password}
                                master={room.master}
                                players={room.players}
                                current={room.current}
                                max={room.max}
                                mode={room.mode}
                                onJoinRoom={onJoinRoom}
                            />
                        </Col>
                    )}
                </Row>
            </div>
            <div
                className="menu"
            >
                <GoToPracticeButton
                    variant="dark"
                    size="sm"
                    onClick={goToPractice}
                >
                    연습하기
                </GoToPracticeButton>
                <CreateRoomButton
                    variant="dark"
                    size="sm"
                    onClick={onCreateRoom}
                >
                    방 만들기
                </CreateRoomButton>
            </div>
        </RoomListBlock>
    );
}

export default RoomList;