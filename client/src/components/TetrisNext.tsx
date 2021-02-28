import React, { memo } from 'react';
import { TetrominoShape } from '../tetris/tetrominos';
import { StyledTetrisNext, StyledTetromino } from './styled/StyledTetris';
import TetrisStageCell from './TetrisStageCell';

interface TetrisNextProps {
    tetrominos: TetrominoShape[] | null;
}

function TetrisNext({ tetrominos }: TetrisNextProps) {
    return(
        <StyledTetrisNext>
            {tetrominos?.map((tetromino, index) =>
                <StyledTetromino
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
                </StyledTetromino>
            )}
        </StyledTetrisNext>
    );
}

export default memo(TetrisNext);