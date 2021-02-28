import React, { memo } from 'react';
import { TetrominoShape } from '../tetris/tetrominos';
import { StyledTetrisHold, StyledTetromino } from './styled/StyledTetris';
import TetrisStageCell from './TetrisStageCell';

interface TetrisHoldProps {
    tetromino: TetrominoShape | null;
}

function TetrisHold({ tetromino }: TetrisHoldProps) {
    return (
        <StyledTetrisHold>
            {tetromino &&
                <StyledTetromino
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
            }
        </StyledTetrisHold>
    );
}

export default memo(TetrisHold);