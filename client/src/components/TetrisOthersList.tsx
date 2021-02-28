import React, { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Player } from '../../../server/src/socket/users';
import { StyledTetirsOthers } from './styled/StyledTetris';
import TetrisOthersItem from './TetrisOthersItem';

interface TetrisOthersListProps {
    players: Player;
}

function TetrisOthersList({ players }: TetrisOthersListProps) {
    return (
        <StyledTetirsOthers>
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
                        <TetrisOthersItem
                            key={index}
                            socketId={socketId}
                            _id={player._id}
                            nickname={player.nickname}
                            team={player.team}
                            stage={player.stage}
                            gameOver={player.gameOver}
                            grade={player.grade}
                        />
                    </Col>
                )}
            </Row>
        </StyledTetirsOthers>
    );
}

export default memo(TetrisOthersList);