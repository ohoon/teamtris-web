import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { Players } from '../../../server/src/socket/users';
import TetrisOthersItem from './TetrisOthersItem';

const Wrapper = styled.div`
    padding: 0 5% 5% 5%;
`;

interface TetrisOthersListProps {
    players: Players;
}

function TetrisOthersList({ players }: TetrisOthersListProps) {
    return (
        <Wrapper>
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
                        <TetrisOthersItem
                            key={index}
                            _id={player._id}
                            socketId={player.socketId}
                            username={player.username}
                            nickname={player.nickname}
                            stage={player.stage}
                            gameOver={player.gameOver}
                        />
                    </Col>
                )}
            </Row>
        </Wrapper>
    );
}

export default TetrisOthersList;