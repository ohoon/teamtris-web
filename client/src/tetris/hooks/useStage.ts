import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Cursor } from '../cursor';
import { createStage, Stage } from '../stage';

function useStage(cursor: Cursor, resetCursor: () => void, endGame: () => void): [Stage, Dispatch<SetStateAction<Stage>>] {
    const [stage, setStage] = useState<Stage>(createStage());

    useEffect(() => {
        const updateStage = (prevStage: Stage): Stage => {
            const newStage: Stage = prevStage.map(row =>
                row.map(cell =>
                    (cell[1] === 'not blocked' ?
                        [0, 'not blocked'] :
                        cell
                    )
                )
            );
    
            cursor.tetromino.forEach((row, y) =>
                row.forEach((type, x) => {
                    if (type !== 0) {
                        if (cursor.pos.y < 1 && newStage[y + cursor.pos.y][x + cursor.pos.x][0] !== 0) {
                            endGame();
                        }

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
                resetCursor();
                
                const sweepedStage: Stage = [];
                newStage.forEach(row => {
                    if (!row.find(cell => cell[0] === 0)) {
                        sweepedStage.unshift(new Array(newStage[0].length).fill([0, 'not blocked']));
                    } else {
                        sweepedStage.push(row);
                    }
                });

                return sweepedStage;
            }

            return newStage;
        };

        setStage((prevStage: Stage) => updateStage(prevStage));
    }, [cursor, resetCursor, endGame]);

    return [stage, setStage];
};

export default useStage;