import { useEffect, useState, Dispatch, SetStateAction, useCallback } from 'react';
import { Cursor, checkCollision } from '../cursor';
import { createStage, Stage } from '../stage';
import { randomTetromino, TETROMINOS, TetrominoShape } from '../tetrominos';

function useStage(cursor: Cursor, resetCursor: (tetromino?: TetrominoShape) => void, pushQueue: (item: TetrominoShape) => void, popQueue: () => TetrominoShape | null, endGame: () => void): [Stage, Dispatch<SetStateAction<Stage>>, number] {
    const [stage, setStage] = useState<Stage>(createStage());
    const [lineCleared, setLineCleared] = useState(0);

    const sweepRows = (newStage: Stage) => {
        const sweepedStage: Stage = [];
        let cleared = 0;
        
        newStage.forEach(row => {
            if (!row.find(cell => cell[0] === 0)) {
                sweepedStage.unshift(new Array(newStage[0].length).fill([0, 'not blocked']));
                cleared += 1;
            } else {
                sweepedStage.push(row);
            }
        });

        setLineCleared(cleared);

        return sweepedStage;
    };

    const updateStage = useCallback((prevStage: Stage): Stage => {
        const newStage: Stage = prevStage.map(row =>
            row.map(cell =>
                (cell[1] === 'not blocked' ?
                    [0, 'not blocked'] :
                    cell
                )
            )
        );

        let outlineY = 0;
        if (cursor.tetromino !== TETROMINOS[0].shape) {
            while (!checkCollision(cursor, newStage, {
                x: 0,
                y: outlineY + 1
            })) {
                outlineY += 1;
            }
        }

        cursor.tetromino.forEach((row, y) =>
            row.forEach((type, x) => {
                if (type !== 0) {
                    if (cursor.pos.y < 1 && newStage[y + cursor.pos.y][x + cursor.pos.x][1] === 'blocked') {
                        endGame();
                    }

                    newStage[y + cursor.pos.y + outlineY][x + cursor.pos.x] = [
                        `${type}`,
                        'not blocked',
                        true
                    ];

                    newStage[y + cursor.pos.y][x + cursor.pos.x] = [
                        type,
                        cursor.collided ?
                            'blocked' :
                            'not blocked'
                    ];
                }
            })
        );

        if (cursor.collided) {
            resetCursor(popQueue() || undefined);
            pushQueue(randomTetromino().shape);

            return sweepRows(newStage);
        }

        return newStage;
    }, [cursor, resetCursor, pushQueue, popQueue, endGame]);

    useEffect(() => {
        setLineCleared(0);
        setStage((prevStage: Stage) => updateStage(prevStage));
    }, [updateStage]);

    return [stage, setStage, lineCleared];
};

export default useStage;