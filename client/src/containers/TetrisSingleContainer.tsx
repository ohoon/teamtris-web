import React, { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
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
import { randomTetromino, TetrominoShape } from '../tetris/tetrominos';
import { createStage } from '../tetris/stage';
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

function TetrisSingleContainer() {
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
    const [stage, setStage, lineCleared] = useStage(cursor, resetCursor, pushQueue, popQueue, endGame);
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

    const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        const { key } = e;

        if (!gameOver) {
            if (key === 'ArrowDown') {
                setDelay(dropSpeed.current);
            } else if (key === ' ') {
                setDelay(dropSpeed.current);
            } else if (key === 'Shift') {
                setDelay(dropSpeed.current);
            }
        }
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const { key } = e;
        
        if (!gameOver) {
            if (key === 'ArrowLeft') {
                moveCursor(-1);
            } else if (key === 'ArrowRight') {
                moveCursor(1);
            } else if (key === 'ArrowUp') {
                rotateCursor(stage, 1);
            } else if (key === 'ArrowDown') {
                dropCursor();
            } else if (key === ' ') {
                hardDropCursor();
            } else if (key === 'Shift') {
                holdCursor();
            }
        }
    };

    useInteval(drop, delay);

    useEffect(() => {
        dropSpeed.current = 1000 / level + 200;
    }, [level]);

    return (
        <TetrisBlock
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
        >
            <Side>
                <TetrisHold
                    tetromino={hold}
                />
                <TetrisHelp />
            </Side>
            <TetrisStage
                stage={stage}
                gameOver={gameOver}
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
                        onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => gameOver || e.preventDefault()}
                        block
                    >
                        시작
                    </StartButton>
                </ButtonGroup>
            </Side>
        </TetrisBlock>
    );
}

export default TetrisSingleContainer;