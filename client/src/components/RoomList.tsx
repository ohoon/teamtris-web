import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'react-bootstrap';
import { Room } from '../../../server/src/socket/rooms';
import RoomItem from '../components/RoomItem';

const RoomListBlock = styled.div`
    height: 100%;
    padding: 8px;

    .head {
        padding: 6px 16px 6px 16px;
        border: 1px solid #747E87;
        border-radius: 5px;
        background: #727F8C;
        font-weight: bold;
        font-size: 13px;
    }

    .body {
        height: 400px;
        margin: 1% auto;
        padding: 8px;
        overflow-x: hidden;
        overflow-y: auto;
        font-size: 13px;
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
    rooms: Room;
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
                방 목록 ({Object.keys(rooms).length}개)
            </div>
            <div
                className="body"
            >
                <Row
                    lg={2}
                    md={2}
                    sm={1}
                    xs={1}
                    noGutters
                >
                    {Object.entries(rooms).map(([roomId, room], index) =>
                        <Col
                            key={index + 1}
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                        >
                            <RoomItem
                                roomId={parseInt(roomId)}
                                title={room.title}
                                password={room.password}
                                players={room.players}
                                current={room.current}
                                max={room.max}
                                mode={room.mode}
                                isStart={room.isStart}
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