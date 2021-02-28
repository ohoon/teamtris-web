import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { WaitingPlayer } from '../../../server/src/socket/users';
import { StyledRoomWrapper, StyledRoomHead, StyledRoomHeadRight, StyledRoomBody, StyledRoomMenu } from './styled/StyledRoom';
import { StyledButton } from './styled/StyledButton';
import RoomLobbySlot from './RoomLobbySlot';
import RoomLobbyEmptySlot from './RoomLobbyEmptySlot';

interface RoomLobbyProps {
    roomId: number;
    title: string;
    password: string;
    players: WaitingPlayer;
    current: number;
    max: 2 | 4 | 8;
    mode: 'single' | 'double';
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
        <StyledRoomWrapper>
            <StyledRoomHead>
                [{roomId}]
                &nbsp;
                {title}
                <StyledRoomHeadRight>
                    {mode === 'single' ? '개인전' : '팀전'}
                    &nbsp;
                    참여자 {current}/{max}
                </StyledRoomHeadRight>
            </StyledRoomHead>
            <StyledRoomBody>
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
            </StyledRoomBody>
            <StyledRoomMenu>
                {isMaster ?
                    <>
                        <StyledButton
                            variant="dark"
                            size="sm"
                            onClick={onStartGame}
                        >
                            시작
                        </StyledButton>
                        <StyledButton
                            variant="dark"
                            size="sm"
                            onClick={onEditRoom}
                        >
                            방 설정
                        </StyledButton>
                    </> :
                    <StyledButton
                        variant="dark"
                        size="sm"
                        onClick={onToggleReady}
                    >
                        {isReady ?
                            "준비 취소":
                            "준비"
                        }
                    </StyledButton>
                }
                <StyledButton
                    variant="dark"
                    size="sm"
                    onClick={onLeaveRoom}
                >
                    나가기
                </StyledButton>
            </StyledRoomMenu>
        </StyledRoomWrapper>
    );
}

export default RoomLobby;