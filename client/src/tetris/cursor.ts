import { STAGE_WIDTH } from './stage';
import { randomTetromino } from './tetrominos';

export interface Pos {
    x: number;
    y: number;
}

export interface Cursor {
    pos: Pos;
    tetromino: (number | string)[][];
    collided: boolean;
}

export const createCursor = () => ({
    pos: {
        x: STAGE_WIDTH / 2 - 2,
        y: 0
    },
    tetromino: randomTetromino().shape,
    collided: false
});