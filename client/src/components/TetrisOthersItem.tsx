import React from 'react';
import styled from 'styled-components';
import { createStage, Stage } from '../tetris/stage';
import TetrisStage from './TetrisStage';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5%;
`;

interface TetrisOthersItemProps {
    socketId: string;
    _id: string;
    username: string;
    nickname: string;
    stage?: Stage;
    gameOver?: boolean;
    grade?: number;
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