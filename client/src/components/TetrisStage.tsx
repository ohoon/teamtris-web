import React, { memo } from 'react';
import styled from 'styled-components';
import TetrisStageCell from './TetrisStageCell';
import { STAGE_WIDTH, STAGE_HEIGHT } from '../tetris/stage';
import { Stage } from '../tetris/stage';

const StageBlock = styled.div`
    display: grid;
    grid-template-rows: repeat(
        ${STAGE_HEIGHT},
        calc(20vw / ${STAGE_WIDTH})
    );
    grid-template-columns: repeat(
        ${STAGE_WIDTH},
        1fr
    );
    grid-gap: 1px;
    width: 100%;
    max-width: 20vw;
    margin: auto;
    background: #111;
`;

interface TetrisStageProps {
    stage: Stage;
    gameOver: boolean;
}

function TetrisStage({ stage, gameOver }: TetrisStageProps) {
    return (
        <StageBlock>
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
        </StageBlock>
    );
}

export default memo(TetrisStage);