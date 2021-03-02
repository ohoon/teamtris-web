import React, { useEffect, memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Player } from '../socket/users';
import { StyledDialogBox, StyledDialogHead, StyledDialogBody } from './styled/StyledDialog';
import { StyledCloseButton } from './styled/StyledButton';

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
        <StyledDialogBox>
            <StyledDialogHead>
                게임 결과
                <StyledCloseButton
                    onClick={handleClose}
                />
            </StyledDialogHead>
            <StyledDialogBody>
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
            </StyledDialogBody>
        </StyledDialogBox>
    );
}

export default memo(GameResultDialog);