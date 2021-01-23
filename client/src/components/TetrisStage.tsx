import React from 'react';
import styled from 'styled-components';
import TetrisStageCell from './TetrisStageCell';
import { STAGE_WIDTH, STAGE_HEIGHT } from '../tetris/stage';
import { Cells } from '../tetris/cell';

const Stage = styled.div`
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
    border: 6px solid #AA0000;
    border-radius: 6px;
    width: 100%;
    max-width: 20vw;
    background: #111;
    margin: 100px auto;
`;

interface TetrisStageProps {
    stage: Cells[];
}

function TetrisStage({ stage }: TetrisStageProps) {
    return (
        <Stage>
            {stage.map(row =>
                row.map((cell, x) =>
                    <TetrisStageCell
                        key={x}
                        type={cell[0]}
                    />
                )
            )}
        </Stage>
    );
}

export default TetrisStage;