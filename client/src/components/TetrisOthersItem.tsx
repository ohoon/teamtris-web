import React from 'react';
import styled from 'styled-components';
import { Player } from '../../../server/src/socket/users';
import { createStage } from '../tetris/stage';
import TetrisStage from './TetrisStage';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5%;
`;

interface TetrisOthersItemProps extends Player {

}

function TetrisOthersItem({ username, nickname, stage = createStage(), gameOver = false, grade }: TetrisOthersItemProps) {
    return (
        <Wrapper>
            <strong>
                {nickname || username}            
            </strong>
            <TetrisStage
                stage={stage}
                gameOver={gameOver}
                size={8}
                overlay={grade ? `${grade}등` : ""}
            />
        </Wrapper>
    );
}

export default TetrisOthersItem;