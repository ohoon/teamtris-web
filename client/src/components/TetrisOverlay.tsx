import React, { memo } from 'react';
import { StyledTetrisOverlay } from './styled/StyledTetris';

interface TetrisOverlayProps {
    text: string;
    size: number;
}

function TetrisOverlay({ text, size }: TetrisOverlayProps) {
    return (
        <StyledTetrisOverlay
            size={size}
        >
            {text}
        </StyledTetrisOverlay>
    );
}

export default memo(TetrisOverlay);