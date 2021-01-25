import React, { memo } from 'react';
import styled from 'styled-components';
import { TETROMINOS } from '../tetris/tetrominos';

const CellBlock = styled.div<{ type: number | string, color: string }>`
    width: auto;
    background: rgba(${props => props.color}, 0.8);
    border: ${props => (props.type === 0 ? "0px solid" : "4px solid")};
    border-bottom-color: rgba(${props => props.color}, 0.1);
    border-right-color: rgba(${props => props.color}, 1);
    border-top-color: rgba(${props => props.color}, 1);
    border-left-color: rgba(${props => props.color}, 0.3);
`;

interface TetrisStageCellProps {
    type: number | string;
    gameOver: boolean;
}

function TetrisStageCell({ type, gameOver }: TetrisStageCellProps) {
    return (
        <CellBlock
            type={type}
            color={type !== 0 && gameOver ? '100, 100, 100' : TETROMINOS[type].color}
        />
    );
}

export default memo(TetrisStageCell);