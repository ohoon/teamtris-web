import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Room } from '../../../server/src/socket/rooms';
import { StyledRoomWrapper, StyledRoomHead, StyledRoomBody, StyledRoomMenu } from './styled/StyledRoom';
import { StyledButton } from './styled/StyledButton';
import RoomItem from './RoomItem';

interface RoomListProps {
    rooms: Room;
    onJoinRoom: (roomId: number) => void;
    onCreateRoom: () => void;
    goToPractice: () => void;
}

function RoomList({ rooms, onJoinRoom, onCreateRoom, goToPractice }: RoomListProps) {
    return (
        <StyledRoomWrapper>
            <StyledRoomHead>
                방 목록 ({Object.keys(rooms).length}개)
            </StyledRoomHead>
            <StyledRoomBody>
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
            </StyledRoomBody>
            <StyledRoomMenu>
                <StyledButton
                    variant="dark"
                    size="sm"
                    onClick={goToPractice}
                >
                    연습하기
                </StyledButton>
                <StyledButton
                    variant="dark"
                    size="sm"
                    onClick={onCreateRoom}
                >
                    방 만들기
                </StyledButton>
            </StyledRoomMenu>
        </StyledRoomWrapper>
    );
}

export default RoomList;