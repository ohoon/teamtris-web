import React, { memo } from 'react';
import { Stage } from '../tetris/stage';
import { StyledTetrisStage } from './styled/StyledTetris';
import TetrisStageCell from './TetrisStageCell';
import TetrisOverlay from './TetrisOverlay';

interface TetrisStageProps {
    stage: Stage;
    gameOver: boolean;
    size: number;
    overlay: string;
}

function TetrisStage({ stage, gameOver, size, overlay }: TetrisStageProps) {
    return (
        <StyledTetrisStage
            size={size}
        >
            {stage.map(row =>
                row.map((cell, x) =>
                    <TetrisStageCell
                        key={x}
                        type={cell[0]}
                        outline={cell[2]}
                        gameOver={gameOver}
                    />
                )
            )}
            <TetrisOverlay
                text={overlay}
                size={size / 8}
            />
        </StyledTetrisStage>
    );
}

export default memo(TetrisStage);