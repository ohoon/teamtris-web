import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { Player } from '../../../server/src/socket/users';

const DialogBlock = styled.div`
    border: 3px solid #E8E8E8;
    background: white;

    .head {
        padding: 1px 10px 1px 10px;
        border: 3px solid #E8E8E8;
        background: #D3D7DB;
        font-weight: bold;
        font-size: 12px;
    }

    .body {
        width: 400px;
        padding: 32px;
        border: 3px solid #E8E8E8;
        background: #EEEEEE;
        overflow-y: auto;
        font-size: 14px;
    }
`;

const CloseButton = styled.div`
    width: 12px;
    height: 12px;
    margin-top: 3px;
    float: right;
    border-radius: 6px;
    background: #EE5555;

    &:hover {
        background: #FF7777;
    }
`;

interface GameResultDialogProps {
    players: Player;
    mode: 'single' | 'double';
    onClose: (name: string) => void;
}

function GameResultDialog({ players, mode, onClose }: GameResultDialogProps) {
    const handleClose = () => {
        onClose('gameResult');
    };

    return (
        <DialogBlock>
            <div
                className="head"
            >
                게임 결과
                <CloseButton
                    onClick={handleClose}
                />
            </div>
            <div
                className="body"
            >
                {mode === 'single' ?
                    <Row
                        lg={1}
                        md={1}
                        sm={1}
                        xs={1}
                    >
                        {Object.values(players)
                            .sort((p1, p2) => p1.grade! - p2.grade!)
                            .map((player, index) =>
                                <Col
                                    key={index + 1}
                                    lg={8}
                                    md={8}
                                    sm={8}
                                    xs={8}
                                >
                                    [{player.grade}등]
                                    &nbsp;
                                    {player.nickname || player.username}
                                </Col>
                        )}
                    </Row> :
                    <Row
                        lg={1}
                        md={1}
                        sm={1}
                        xs={1}
                    >
                        {Object.values(players)
                            .sort((p1, p2) => p1.grade! - p2.grade!)
                            .map((player, index) =>
                                <Col
                                    key={index + 1}
                                    lg={8}
                                    md={8}
                                    sm={8}
                                    xs={8}
                                >
                                    [{player.grade}등]
                                    &nbsp;
                                    {player.nickname || player.username}
                                    &nbsp;
                                    {player.team}
                                </Col>
                        )}
                        <Col
                            lg={8}
                            md={8}
                            sm={8}
                            xs={8}
                        >
                            {Object.values(players).find(player => player.grade === 1)?.team}팀 승리!
                        </Col>
                    </Row>
                }
            </div>
        </DialogBlock>
    );
}

export default GameResultDialog;