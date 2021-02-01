import React from 'react';
import styled from 'styled-components';
import { Players } from '../../../server/src/socket/users';
import TetrisOthersItem from './TetrisOthersItem';

const Wrapper = styled.div`

`;

interface TetrisOthersListProps {
    players: Players;
}

function TetrisOthersList({ players }: TetrisOthersListProps) {
    return (
        <Wrapper>
            {players.map((player, index) => 
                <TetrisOthersItem
                    key={index}
                    _id={player._id}
                    socketId={player.socketId}
                    username={player.username}
                    nickname={player.nickname}
                    stage={player.stage}
                    gameOver={player.gameOver}
                />
            )}
        </Wrapper>
    );
}

export default TetrisOthersList;