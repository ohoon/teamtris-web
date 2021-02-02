import React from 'react';
import styled from 'styled-components';
import { Player } from '../../../server/src/socket/users';
import TetrisStage from './TetrisStage';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5%;
`;

interface TetrisOthersItemProps extends Player {

}

function TetrisOthersItem({ username, nickname, stage, gameOver }: TetrisOthersItemProps) {
    return (
        <Wrapper>
            <strong>
                {nickname || username}            
            </strong>
            <TetrisStage
                stage={stage}
                gameOver={gameOver}
                size={8}
            />
        </Wrapper>
    );
}

export default TetrisOthersItem;