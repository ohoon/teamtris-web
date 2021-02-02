import React from 'react';
import styled from 'styled-components';
import { Player } from '../../../server/src/socket/users';
import { Stage } from '../tetris/stage';
import TetrisStage from './TetrisStage';

const Wrapper = styled.div`

`;

interface TetrisOthersItemProps extends Player {

}

function TetrisOthersItem({ username, nickname, stage, gameOver }: TetrisOthersItemProps) {
    return (
        <Wrapper>
            <p>
                {nickname || username}
            </p>
            <TetrisStage
                stage={stage}
                gameOver={gameOver}
                size={10}
            />
        </Wrapper>
    );
}

export default TetrisOthersItem;