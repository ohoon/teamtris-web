import { useState, useCallback } from 'react';
import { TETROMINOS, TetrominoShape } from '../tetrominos';
import { Cursor, Pos, createCursor, checkCollision } from '../cursor';
import { Stage } from '../stage';

function useCursor(): [Cursor, (pos: Pos & { collided: boolean }) => void, (stage: Stage, dir: number) => void, (tetromino ?: TetrominoShape) => void] {
    const [cursor, setCursor] = useState<Cursor>({
        pos: {
            x: 0,
            y: 0
        },
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const updateCursorPos = (pos: Pos & { collided: boolean }) => {
        const { x, y, collided } = pos;

        setCursor(prev => ({
            ...prev,
            pos: {
                x: (prev.pos.x + x),
                y: (prev.pos.y + y)
            },
            collided
        }));
    };

    const rotate = (prevCursor: Cursor, dir: number) => {
        const length = prevCursor.tetromino.length;
        const rotated = prevCursor.tetromino.map((row, y) => 
            row.map((_, x) => {
                if (dir > 0) {
                    return prevCursor.tetromino[length-x-1][y]
                } else {
                    return prevCursor.tetromino[x][length-y-1]   
                }
            })
        );

        return {
            ...prevCursor,
            tetromino: rotated
        };
    };

    const rotateCursor = (stage: Stage, dir: number) => {
        const rotatedCursor = rotate(cursor, dir);
        const posX = rotatedCursor.pos.x;

        let offset = 1;
        while (checkCollision(rotatedCursor, stage, {
            x: 0,
            y: 0
        })) {
            rotatedCursor.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > rotatedCursor.tetromino[0].length) {
                rotate(rotatedCursor, -dir);
                rotatedCursor.pos.x = posX;
                return;
            }
        }

        setCursor(rotatedCursor);
    };

    const resetCursor = useCallback((tetromino ?: TetrominoShape) => {
        setCursor(createCursor(tetromino));
    }, []);

    return [cursor, updateCursorPos, rotateCursor, resetCursor];
}

export default useCursor;