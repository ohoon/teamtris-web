import React, { memo } from 'react';
import styled from 'styled-components';
import TetrisStageCell from './TetrisStageCell';
import TetrisOverlay from './TetrisOverlay';
import { STAGE_WIDTH, STAGE_HEIGHT } from '../tetris/stage';
import { Stage } from '../tetris/stage';

const StageBlock = styled.div<{ size: number }>`
    display: grid;
    grid-template-rows: repeat(
        ${STAGE_HEIGHT},
        calc(${props => props.size}vw / ${STAGE_WIDTH})
    );
    grid-template-columns: repeat(
        ${STAGE_WIDTH},
        1fr
    );
    grid-gap: 1px;
    position: relative;
    width: 100%;
    max-width: ${props => props.size}vw;
    margin: auto;
    background: #111;
`;

interface TetrisStageProps {
    stage: Stage;
    gameOver: boolean;
    size: number;
}

function TetrisStage({ stage, gameOver, size }: TetrisStageProps) {
    return (
        <StageBlock
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
                text={gameOver ? "GAME OVER" : ""}
            />
        </StageBlock>
    );
}

export default memo(TetrisStage);