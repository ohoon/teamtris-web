import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Cursor } from '../cursor';
import { createStage, Stage } from '../stage';

function useStage(cursor: Cursor, resetCursor: () => void): [Stage, Dispatch<SetStateAction<Stage>>] {
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
            }

            return newStage;
        };

        setStage((prevStage: Stage) => updateStage(prevStage));
    }, [cursor, resetCursor]);

    return [stage, setStage];
};

export default useStage;