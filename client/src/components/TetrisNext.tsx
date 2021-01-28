import React, { memo } from 'react';
import styled from 'styled-components';
import { TetrominoShape } from '../tetris/tetrominos';
import TetrisStageCell from './TetrisStageCell';

const NextBlock = styled.div`
    width: 6vw;
    height: 18vw;
    display: flex;
    flex-direction: column;
    align-items: center;
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

interface TetrisNextProps {
    tetrominos: TetrominoShape[] | null;
}

function TetrisNext({ tetrominos }: TetrisNextProps) {
    return(
        <NextBlock>
            {tetrominos?.map((tetromino, index) =>
                <TetrominoBlock
                    key={index + 1}
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
            )}
        </NextBlock>
    );
}

export default memo(TetrisNext);