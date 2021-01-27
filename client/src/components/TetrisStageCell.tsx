import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import { TETROMINOS } from '../tetris/tetrominos';

const CellBlock = styled.div<{ type: number | string, color: string, outline?: boolean }>`
    width: auto;
    ${props => props.outline ?
        css`
        background: rgba(${props.color}, 0.2);
        border: ${props.type === 0 ? '0px solid' : '4px solid'};
        border-bottom-color: rgba(${props.color}, 0.015);
        border-right-color: rgba(${props.color}, 0.10);
        border-top-color: rgba(${props.color}, 0.10);
        border-left-color: rgba(${props.color}, 0.05);
        ` :
        css`
        background: rgba(${props.color}, 0.8);
        border: ${props.type === 0 ? '0px solid' : '4px solid'};
        border-bottom-color: rgba(${props.color}, 0.1);
        border-right-color: rgba(${props.color}, 1);
        border-top-color: rgba(${props.color}, 1);
        border-left-color: rgba(${props.color}, 0.3);
        `
    }
`;

interface TetrisStageCellProps {
    type: number | string;
    outline?: boolean;
    gameOver?: boolean;
}

function TetrisStageCell({ type, outline, gameOver }: TetrisStageCellProps) {
    return (
        <CellBlock
            type={type}
            color={type !== 0 && gameOver ? '100, 100, 100' : TETROMINOS[type].color}
            outline={outline}
        />
    );
}

export default memo(TetrisStageCell);