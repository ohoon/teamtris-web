import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'react-bootstrap';
import { WaitingPlayer } from '../../../server/src/socket/users';
import RoomLobbySlot from './RoomLobbySlot';
import RoomLobbyEmptySlot from './RoomLobbyEmptySlot';

const RoomLobbyBlock = styled.div`
height: 100%;
padding: 8px;

.head {
    padding: 8px 16px 8px 16px;
    border: 1px solid #747E87;
    border-radius: 5px;
    background: #B2B7C1;
    font-weight: bold;
    font-size: 14px;
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
    onChangeTeam: () => void;
    onKickPlayer: (socketId: string) => void;
    onEditRoom: () => void;
    onLeaveRoom: () => void;
}

function RoomLobby({ roomId, title, players, current, max, mode, isReady, isMaster, onStartGame, onToggleReady, onChangeTeam, onKickPlayer, onEditRoom, onLeaveRoom }: RoomLobbyProps) {
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
                    noGutters
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
                                nickname={player.nickname}
                                profileImage={player.profileImage}
                                isReady={player.isReady}
                                isMaster={player.isMaster}
                                team={mode === 'double' ? player.team : undefined}
                                onChangeTeam={mode === 'double' ? onChangeTeam : undefined}
                                onKickPlayer={isMaster ? onKickPlayer : undefined}
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