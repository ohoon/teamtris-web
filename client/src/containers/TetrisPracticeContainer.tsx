import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import TetrisHold from '../components/TetrisHold';
import TetrisHelp from '../components/TetrisHelp';
import TetrisStage from '../components/TetrisStage';
import TetrisNext from '../components/TetrisNext';
import TetrisStatus from '../components/TetrisStatus';
import useStage from '../tetris/hooks/useStage';
import useCursor from '../tetris/hooks/useCursor';
import useInteval from '../tetris/hooks/useInterval';
import useQueue from '../tetris/hooks/useQueue';
import useStatus from '../tetris/hooks/useStatus';
import { randomTetromino, TetrominoShape, TETROMINOS } from '../tetris/tetrominos';
import { createStage, Stage } from '../tetris/stage';
import { checkCollision } from '../tetris/cursor';

const TetrisBlock = styled.div`
    width: 100%;
    max-width: 38vw;
    display: flex;
    margin: 16px;
    padding: 16px;
    border: 10px solid #343A40;
    border-radius: 6px;
    background: #909090;
`;

const Side = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StartButton = styled(Button)`
    height: 100%;
    margin: 10%;
`;

function TetrisPracticeContainer() {
    const [hold, setHold] = useState<TetrominoShape | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [delay, setDelay] = useState<number | null>(null);
    const dropSpeed = useRef(1000);

    const startGame = () => {
        setStage(createStage());
        resetCursor();
        initQueue();
        resetStatus();

        setHold(null);
        setGameOver(false);

        setDelay(dropSpeed.current);
    };

    const endGame = useCallback(() => {
        setGameOver(true);
        setDelay(null);
    }, []);

    const [cursor, updateCursorPos, rotateCursor, resetCursor] = useCursor();
    const [queue, pushQueue, popQueue, resetQueue] = useQueue<TetrominoShape>();
    const [lineCleared, setLineCleared] = useState(0);

    const sweepRows = (prev: Stage) => {
        const newStage: Stage = [];
        let cleared = 0;
        
        prev.forEach(row => {
            if (!row.find(cell => cell[0] === 0)) {
                newStage.unshift(new Array(prev[0].length).fill([0, 'not blocked']));
                cleared += 1;
            } else {
                newStage.push(row);
            }
        });

        setLineCleared(cleared);

        return newStage;
    };

    const updateStage = useCallback((prev: Stage): Stage => {
        setLineCleared(0);

        const newStage: Stage = prev.map(row =>
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

    const [stage, setStage] = useStage(updateStage);
    const [score, rows, level, resetStatus] = useStatus(lineCleared);

    const initQueue = () => {
        resetQueue();

        for (let i = 0; i < 3; i++) {
            pushQueue(randomTetromino().shape);
        }
    };

    const moveCursor = (X: number) => {
        if (!checkCollision(cursor, stage, {
            x: X,
            y: 0
        })) {
            updateCursorPos({
                x: X,
                y: 0,
                collided: false
            });
        }
    };

    const drop = () => {
        if (!checkCollision(cursor, stage, {
            x: 0,
            y: 1
        })) {
            updateCursorPos({
                x: 0,
                y: 1,
                collided: false
            });
        } else {
            updateCursorPos({
                x: 0,
                y: 0,
                collided: true
            });
        }
    };

    const hardDrop = () => {
        let Y = 0;
        while (!checkCollision(cursor, stage, {
            x: 0,
            y: Y + 1
        })) {
            Y += 1;
        }

        updateCursorPos({
            x: 0,
            y: Y,
            collided: true
        });
    };

    const dropCursor = () => {
        setDelay(null);
        drop();
    };

    const hardDropCursor = () => {
        setDelay(null);
        hardDrop();
    };

    const holdCursor = () => {
        setDelay(null);

        const _hold = hold?.slice();
        setHold(cursor.tetromino);

        if (_hold) {
            resetCursor(_hold);
        } else {
            resetCursor(popQueue() || undefined);
            pushQueue(randomTetromino().shape);
        }
    }

    const onKeyUp = (e: any) => {
        const { key } = e;

        if (!gameOver) {
            if (key === 'ArrowDown') {
                e.preventDefault();
                setDelay(dropSpeed.current);
            } else if (key === ' ') {
                e.preventDefault();
                setDelay(dropSpeed.current);
            } else if (key === 'Shift') {
                e.preventDefault();
                setDelay(dropSpeed.current);
            }
        }
    };

    const onKeyDown = (e: any) => {
        const { key } = e;
        
        if (!gameOver) {
            if (key === 'ArrowLeft') {
                e.preventDefault();
                moveCursor(-1);
            } else if (key === 'ArrowRight') {
                e.preventDefault();
                moveCursor(1);
            } else if (key === 'ArrowUp') {
                e.preventDefault();
                rotateCursor(stage, 1);
            } else if (key === 'ArrowDown') {
                e.preventDefault();
                dropCursor();
            } else if (key === ' ') {
                e.preventDefault();
                hardDropCursor();
            } else if (key === 'Shift') {
                e.preventDefault();
                holdCursor();
            }
        }
    };

    useInteval(drop, delay);

    useEffect(() => {
        dropSpeed.current = 1000 / level + 200;
    }, [level]);

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('keydown', onKeyDown);
        };
    });

    return (
        <TetrisBlock>
            <Side>
                <TetrisHold
                    tetromino={hold}
                />
                <TetrisHelp />
            </Side>
            <TetrisStage
                stage={stage}
                gameOver={gameOver}
                size={20}
            />
            <Side>
                <TetrisNext
                    tetrominos={queue}
                />
                <TetrisStatus
                    score={score}
                    rows={rows}
                    level={level}
                />
                <ButtonGroup>
                    <StartButton
                        variant="info"
                        size="lg"
                        onClick={startGame}
                        block
                    >
                        시작
                    </StartButton>
                </ButtonGroup>
            </Side>
        </TetrisBlock>
    );
}

export default TetrisPracticeContainer;