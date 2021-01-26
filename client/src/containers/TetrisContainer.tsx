import React, { KeyboardEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import TetrisStage from '../components/TetrisStage';
import useStage from '../tetris/hooks/useStage';
import useCursor from '../tetris/hooks/useCursor';
import useInteval from '../tetris/hooks/useInterval';
import { createStage } from '../tetris/stage';
import { checkCollision } from '../tetris/cursor';

const Wrapper = styled.div`
    margin: 100px auto;
`;

function TetrisContainer() {
    const [gameOver, setGameOver] = useState(false);
    const [delay, setDelay] = useState<number | null>(null);

    const startGame = () => {
        setStage(createStage());
        resetCursor();

        setGameOver(false);
        setDelay(1000);
    };

    const endGame = useCallback(() => {
        setGameOver(true);
        setDelay(null);
    }, []);

    const [cursor, updateCursorPos, rotateCursor, resetCursor] = useCursor();
    const [stage, setStage] = useStage(cursor, resetCursor, endGame);

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
        let Y = 1;
        while (!checkCollision(cursor, stage, {
            x: 0,
            y: Y
        })) {
            Y += 1;
        }

        updateCursorPos({
            x: 0,
            y: Y - 1,
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

    const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        const { key } = e;

        if (!gameOver) {
            if (key === 'ArrowDown') {
                setDelay(1000);
            } else if (key === ' ') {
                setDelay(1000);
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
            }
        }
    };

    useInteval(drop, delay);

    return (
        <Wrapper
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
        >
            <TetrisStage
                stage={stage}
                gameOver={gameOver}
            />
            <button
                onClick={startGame}
                onKeyDown={(e) => e.preventDefault()}
            >
                시작
            </button>
        </Wrapper>
    );
}

export default TetrisContainer;