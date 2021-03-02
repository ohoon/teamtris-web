import { TetrominoType } from './tetrominos';

export type Cell = [TetrominoType, string, boolean?];

export type Stage = Cell[][];