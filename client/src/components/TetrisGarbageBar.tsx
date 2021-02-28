import React, { memo } from 'react';
import { StyledTetrisGarbageBar } from './styled/StyledTetris';
import TetrisStageCell from './TetrisStageCell';

interface TetrisGarbageBarProps {
    garbage: number;
}

function TetrisGarbageBar({ garbage }: TetrisGarbageBarProps) {
    const garbageStage = Array(10 - garbage).fill(0).concat(Array(garbage).fill('G'));

    return(
        <StyledTetrisGarbageBar>
            {garbageStage.map((type, index) =>
                <TetrisStageCell
                    key={index + 1}
                    type={type}
                />
            )}
        </StyledTetrisGarbageBar>
    );
}

export default memo(TetrisGarbageBar);