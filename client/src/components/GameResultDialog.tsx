import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { Player } from '../../../server/src/socket/users';

const DialogBlock = styled.div`
    border: 1px solid #D8D8D8;

    .head {
        padding: 3px 12px 3px 12px;
        border: 1px solid #747E87;
        background: #B2B7C1;
        font-weight: bold;
        font-size: 13px;
    }

    .body {
        width: 400px;
        padding: 32px;
        background: #EEE;
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
    onApplyResult: () => void;
    onClose: (name: string) => void;
}

function GameResultDialog({ players, mode, onApplyResult, onClose }: GameResultDialogProps) {
    const handleClose = () => {
        onClose('gameResult');
    };

    useEffect(() => {
        onApplyResult();
    // eslint-disable-next-line
    }, []);

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
                                    {player.nickname}
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
                                    {player.nickname}
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