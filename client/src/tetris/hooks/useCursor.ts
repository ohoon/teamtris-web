import { useState, useCallback } from 'react';
import { TETROMINOS } from '../tetrominos';
import { Cursor, Pos, createCursor } from '../cursor';

function useCursor(): [Cursor, (pos: Pos & { collided: boolean }) => void, () => void] {
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

    const resetCursor = useCallback(() => {
        setCursor(createCursor());
    }, []);

    return [cursor, updateCursorPos, resetCursor];
}

export default useCursor;