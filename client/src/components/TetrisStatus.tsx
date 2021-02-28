import React, { memo } from 'react';
import { StyledTetrisStatus } from './styled/StyledTetris';

interface TetrisStatusProps {
    score: number;
    rows: number;
    level: number;
}

function TetrisStatus({ score, rows, level }: TetrisStatusProps) {
    return (
        <StyledTetrisStatus>
            <p>
                score
                <br />
                {score}
            </p>
            <p>
                rows
                <br />
                {rows}
            </p>
            <p>
                level
                <br />
                {level}
            </p>
        </StyledTetrisStatus>
    );
}

export default memo(TetrisStatus);