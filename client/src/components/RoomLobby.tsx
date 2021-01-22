import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { Room } from '../../../server/src/socket/rooms';
import { Players } from '../../../server/src/socket/users';
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
`;

interface RoomLobbyProps extends Room {
    
}

function RoomLobby({ id, title, players, current, max, mode }: RoomLobbyProps) {
    const gridPlayers: Players[] = [];
    for (let i = 0; i < players.length; i = i + 4) {
        gridPlayers.push(players.slice(i, i + 4));
    }

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
                {gridPlayers.map((row, index) =>
                    <Row
                        key={index + 1}
                    >
                        {row.map((col, index) =>
                            <Col
                                key={index + 1}
                                md={3}
                            >
                                <RoomLobbySlot
                                    socketId={col.socketId}
                                    id={col.id}
                                    username={col.username}
                                    nickname={col.nickname}
                                />
                            </Col>
                        )}
                    </Row>
                )}
            </div>
        </RoomLobbyBlock>
    );
}

export default RoomLobby;