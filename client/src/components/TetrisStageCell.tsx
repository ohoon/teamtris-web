import React, { memo } from 'react';
import { TETROMINOS } from '../tetris/tetrominos';
import { StyledTetrisCell } from './styled/StyledTetris';

interface TetrisStageCellProps {
    type: number | string;
    outline?: boolean;
    gameOver?: boolean;
}

function TetrisStageCell({ type, outline, gameOver }: TetrisStageCellProps) {
    return (
        <StyledTetrisCell
            type={type}
            color={type !== 0 && gameOver ? '100, 100, 100' : TETROMINOS[type].color}
            outline={outline}
        />
    );
}

export default memo(TetrisStageCell);