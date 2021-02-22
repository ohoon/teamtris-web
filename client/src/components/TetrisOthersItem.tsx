import React from 'react';
import styled from 'styled-components';
import { TEAM } from '../socket/rooms';
import { createStage, Stage } from '../tetris/stage';
import TetrisStage from './TetrisStage';

const Wrapper = styled.div<{ team?: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5%;
    ${props => props.team && `background: ${TEAM[props.team].color}`}
`;

interface TetrisOthersItemProps {
    socketId: string;
    _id: string;
    nickname: string;
    team?: string;
    stage?: Stage;
    gameOver?: boolean;
    grade?: number;
}

function TetrisOthersItem({ nickname, team, stage = createStage(), gameOver = false, grade }: TetrisOthersItemProps) {
    return (
        <Wrapper
            team={team}
        >
            <strong>
                {nickname}            
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