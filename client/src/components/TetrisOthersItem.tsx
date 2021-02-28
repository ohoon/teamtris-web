import React, { memo } from 'react';
import { createStage, Stage } from '../tetris/stage';
import { StyledTetrisOthersItem } from './styled/StyledTetris';
import TetrisStage from './TetrisStage';

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
        <StyledTetrisOthersItem
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
        </StyledTetrisOthersItem>
    );
}

export default memo(TetrisOthersItem);