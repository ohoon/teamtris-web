import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'react-bootstrap';
import { Room } from '../../../server/src/socket/rooms';
import RoomLobbySlot from './RoomLobbySlot';

const RoomLobbyBlock = styled.div`
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

const StartGameButton = styled(Button)`
    
`;

const ReadyButton = styled(Button)`
    
`;

const LeaveRoomButton = styled(Button)`
    margin-left: 2px;
`;

interface RoomLobbyProps extends Room {
    isReady: boolean;
    isMaster: boolean;
    onStartGame: () => void;
    onReady: () => void;
    onLeaveRoom: () => void;
}

function RoomLobby({ id, title, players, current, max, mode, isReady, isMaster, onStartGame, onReady, onLeaveRoom }: RoomLobbyProps) {
    return (
        <RoomLobbyBlock>
            <div
                className="head"
            >
                [{id}] {title} {mode} 참여자 {current}/{max}
            </div>
            <div
                className="body"
            >
                <Row
                    lg={4}
                    md={4}
                    sm={2}
                    xs={2}
                >
                    {players.map((player, index) =>
                        <Col
                            key={index + 1}
                            lg={3}
                            md={3}
                            sm={6}
                            xs={6}
                        >
                            <RoomLobbySlot
                                socketId={player.socketId}
                                _id={player._id}
                                username={player.username}
                                nickname={player.nickname}
                                isReady={player.isReady}
                                isMaster={player.isMaster}
                            />
                        </Col>
                    )}
                </Row>
            </div>
            <div
                className="menu"
            >
                {isMaster ?
                    <StartGameButton
                        variant="dark"
                        size="sm"
                        onClick={onStartGame}
                    >
                        시작
                    </StartGameButton> :
                    <ReadyButton
                        variant="dark"
                        size="sm"
                        onClick={onReady}
                    >
                        {isReady ?
                            "준비 취소":
                            "준비"
                        }
                    </ReadyButton>
                }
                <LeaveRoomButton
                    variant="dark"
                    size="sm"
                    onClick={onLeaveRoom}
                >
                    나가기
                </LeaveRoomButton>
            </div>
        </RoomLobbyBlock>
    );
}

export default RoomLobby;