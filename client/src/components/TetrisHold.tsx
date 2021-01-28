import React, { memo } from 'react';
import styled from 'styled-components';
import { TetrominoShape } from '../tetris/tetrominos';
import TetrisStageCell from './TetrisStageCell';

const HoldBlock = styled.div`
    width: 6vw;
    height: 6vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111;
`;

const TetrominoBlock = styled.div<{ width: number, height: number }>`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(6vw / 5)
    );
    grid-template-columns: repeat(
        ${props => props.width},
        calc(6vw / 5)
    );
    grid-gap: 1px;
    margin: auto;
`;

interface TetrisHoldProps {
    tetromino: TetrominoShape | null;
}

function TetrisHold({ tetromino }: TetrisHoldProps) {
    return (
        <HoldBlock>
            {tetromino &&
                <TetrominoBlock
                    width={tetromino.length}
                    height={tetromino[0].length}
                >
                    {tetromino.map(row =>
                        row.map((type, x) =>
                            <TetrisStageCell
                                key={x}
                                type={type}
                            />
                        )
                    )}
                </TetrominoBlock>
            }
        </HoldBlock>
    );
}

export default memo(TetrisHold);