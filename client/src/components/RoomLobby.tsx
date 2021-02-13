import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'react-bootstrap';
import { WaitingPlayer } from '../../../server/src/socket/users';
import RoomLobbySlot from './RoomLobbySlot';
import RoomLobbyEmptySlot from './RoomLobbyEmptySlot';

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

const EditRoomButton = styled(Button)`
    margin-left: 2px;
`;

const LeaveRoomButton = styled(Button)`
    margin-left: 2px;
`;

interface RoomLobbyProps {
    roomId: number;
    title: string;
    password: string;
    players: WaitingPlayer;
    current: number;
    max: 2 | 4 | 8;
    mode: 'single' | 'double';
    isStart: boolean;
    isReady: boolean;
    isMaster: boolean;
    onStartGame: () => void;
    onToggleReady: () => void;
    onKickPlayer: (socketId: string) => void;
    onEditRoom: () => void;
    onLeaveRoom: () => void;
}

function RoomLobby({ roomId, title, players, current, max, mode, isReady, isMaster, onStartGame, onToggleReady, onKickPlayer, onEditRoom, onLeaveRoom }: RoomLobbyProps) {
    return (
        <RoomLobbyBlock>
            <div
                className="head"
            >
                [{roomId}] {title} {mode} 참여자 {current}/{max}
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
                    {Object.entries(players).map(([socketId, player], index) =>
                        <Col
                            key={index + 1}
                            lg={3}
                            md={3}
                            sm={6}
                            xs={6}
                        >
                            <RoomLobbySlot
                                socketId={socketId}
                                _id={player._id}
                                username={player.username}
                                nickname={player.nickname}  
                                isReady={player.isReady}
                                isMaster={player.isMaster}
                                onKickPlayer={onKickPlayer}
                            />
                        </Col>
                    )}
                    {Array(max - Object.keys(players).length).fill('empty').map((_, index) =>                     
                        <Col
                            key={index + 1}
                            lg={3}
                            md={3}
                            sm={6}
                            xs={6}
                        >
                            <RoomLobbyEmptySlot />
                        </Col>
                    )}
                </Row>
            </div>
            <div
                className="menu"
            >
                {isMaster ?
                    <>
                        <StartGameButton
                            variant="dark"
                            size="sm"
                            onClick={onStartGame}
                        >
                            시작
                        </StartGameButton>
                        <EditRoomButton
                            variant="dark"
                            size="sm"
                            onClick={onEditRoom}
                        >
                            방 설정
                        </EditRoomButton>
                    </> :
                    <ReadyButton
                        variant="dark"
                        size="sm"
                        onClick={onToggleReady}
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