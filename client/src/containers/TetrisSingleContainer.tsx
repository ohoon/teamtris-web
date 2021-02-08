import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import socket from '../socket';
import TetrisHold from '../components/TetrisHold';
import TetrisGarbageBar from '../components/TetrisGarbageBar';
import TetrisStage from '../components/TetrisStage';
import TetrisNext from '../components/TetrisNext';
import TetrisStatus from '../components/TetrisStatus';
import useStage from '../tetris/hooks/useStage';
import useCursor from '../tetris/hooks/useCursor';
import useInterval from '../tetris/hooks/useInterval';
import useQueue from '../tetris/hooks/useQueue';
import useStatus from '../tetris/hooks/useStatus';
import useCountDown from '../tetris/hooks/useCountDown';
import { randomTetromino, TetrominoShape, TETROMINOS } from '../tetris/tetrominos';
import { createStage, Stage, STAGE_WIDTH } from '../tetris/stage';
import { checkCollision } from '../tetris/cursor';
import { useDispatch } from 'react-redux';
import { setRoom } from '../modules/room';

const TetrisBlock = styled.div`
    width: 100%;
    max-width: 38vw;
    height: 100%;
    max-height: 76vw;
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

function TetrisSingleContainer() {
    const dispatch = useDispatch();

    const [hold, setHold] = useState<TetrominoShape | null>(null);
    const [gameOver, setGameOver] = useState<boolean>();
    const [overlay, setOverlay] = useState<string>('Waiting...');
    const [delay, setDelay] = useState<number | null>(null);
    const dropSpeed = useRef(1000);

    const [cursor, updateCursorPos, rotateCursor, resetCursor] = useCursor();
    const [queue, pushQueue, popQueue, resetQueue] = useQueue<TetrominoShape>();
    const [lineCleared, setLineCleared] = useState(0);

    const endGame = useCallback(() => {
        setGameOver(true);
        setDelay(null);
    }, []);

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
        socket.emit('tetromino is collided', newStage);

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
                        socket.emit('end game');
                        endGame();
                        return;
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
    const [garbage, setGarbage] = useState(0);

    const initQueue = useCallback(() => {
        resetQueue();

        for (let i = 0; i < 3; i++) {
            pushQueue(randomTetromino().shape);
        }
    }, [resetQueue, pushQueue]);

    const startGame = useCallback(() => {
        setStage(createStage());
        resetCursor();
        initQueue();
        resetStatus();

        setHold(null);
        setGameOver(false);

        setDelay(dropSpeed.current);
    }, [setStage, initQueue, resetCursor, resetStatus]);

    const countDown = useCountDown(3);

    const startCount = useCallback(() => {
        const id = setInterval(() => {
            const num = countDown.next().value;
            if (num) {
                setOverlay(num.toString());
            } else {
                clearInterval(id);
                setOverlay('');
                startGame();
            }
        }, 1500);
    }, [countDown, startGame]);

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
    };

    const attackedByGarbage = useCallback((prev: number): number => {
        const height = Math.floor(prev / 10);
        const garbageLines = Array.from(
            Array(height),
            () => {
                const array = new Array(STAGE_WIDTH).fill(['G', 'blocked']);
                array[Math.floor(Math.random() * STAGE_WIDTH)] = [0, 'not blocked'];

                return array;
            }
        );

        setStage(stage.slice(height).concat(garbageLines));

        return prev % 10;
    }, [stage, setStage]);

    const onKeyUp = (e: any) => {
        const { key, target } = e;

        if (gameOver === false && target.tagName !== 'INPUT') {
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
        const { key, target } = e;
        
        if (gameOver === false && target.tagName !== 'INPUT') {
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

    useInterval(drop, delay);
    
    useEffect(() => {
        socket.on('start game', () => {
            startCount();
        });

        return () => {
            socket.removeListener('start game');
        }
    }, [startCount]);

    useEffect(() => {
        dropSpeed.current = 1000 / level + 200;
    }, [level]);

    useEffect(() => {
        if (lineCleared > 0) {
            const garbage = Math.pow(2, lineCleared - 1) * level;
            socket.emit('garbage attack', garbage);
        }
    }, [lineCleared, level]);

    useEffect(() => {
        socket.on('someone attack you', (garbage: number) => {
            setGarbage(prev => attackedByGarbage(prev + garbage));
        });

        return () => {
            socket.removeListener('someone attack you');
        }
    }, [attackedByGarbage]);

    useEffect(() => {
        socket.on('you are won', () => {
            socket.emit('end game');
            endGame();
        });
        
        return () => {
            socket.removeListener('you are won');
        };
    }, [endGame]);

    useEffect(() => {
        socket.emit('tetris is loaded', createStage());

        return () => {
            dispatch(setRoom(null));
            socket.emit('end game');
            socket.emit('leave room');
        };
    }, [dispatch]);

    useEffect(() => {
        socket.on('send game result', (grade: number) => {
            setOverlay(`${grade}등`);
        });

        return () => {
            socket.removeListener('send game result');
        };
    });

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('keydown', onKeyDown);
        };
    });

    return (
        <TetrisBlock
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
        >
            <Side>
                <TetrisHold
                    tetromino={hold}
                />
                <TetrisGarbageBar
                    garbage={garbage}
                />
            </Side>
            <TetrisStage
                stage={stage}
                gameOver={gameOver || false}
                size={20}
                overlay={overlay}
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
            </Side>
        </TetrisBlock>
    );
}

export default TetrisSingleContainer;