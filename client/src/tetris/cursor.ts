import { STAGE_WIDTH, Stage } from './stage';
import { TetrominoShape, randomTetromino } from './tetrominos';

export interface Pos {
    x: number;
    y: number;
}

export interface Cursor {
    pos: Pos;
    tetromino: TetrominoShape;
    collided: boolean;
}

export const createCursor = (tetromino ?: TetrominoShape) => ({
    pos: {
        x: STAGE_WIDTH / 2 - 2,
        y: 0
    },
    tetromino: tetromino ? tetromino : randomTetromino().shape,
    collided: false
});

export const checkCollision = (cursor: Cursor, stage: Stage, pos: Pos) => {
    const { x: X, y: Y } = pos;
    for (let y = 0; y < cursor.tetromino.length; y += 1) {
        for (let x = 0; x < cursor.tetromino[y].length; x += 1) {
            if (cursor.tetromino[y][x] === 0) {
                continue;
            }
            
            if (
                !stage[y + cursor.pos.y + Y] ||
                !stage[y + cursor.pos.y + Y][x + cursor.pos.x + X] ||
                stage[y + cursor.pos.y + Y][x + cursor.pos.x + X][1] === 'blocked'
            ) {
                return true;
            }
        }
    }

    return false;
};