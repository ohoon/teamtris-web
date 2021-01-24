export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export type Cell = [number | string, string];

export type Stage = Cell[][];

export const createStage = () => {
    return Array.from(
        Array(STAGE_HEIGHT),
        () => new Array(STAGE_WIDTH).fill([0, 'not blocked'])
    );
};