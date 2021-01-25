import React, { KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import TetrisStage from '../components/TetrisStage';
import useStage from '../tetris/hooks/useStage';
import useCursor from '../tetris/hooks/useCursor';
import useInteval from '../tetris/hooks/useInterval';
import { createStage } from '../tetris/stage';
import { Pos } from '../tetris/cursor';

const Wrapper = styled.div`
    margin: 100px auto;
`;

function TetrisContainer() {
    const [cursor, updateCursorPos, resetCursor] = useCursor();
    const [stage, setStage] = useStage(cursor, resetCursor);

    const [delay, setDelay] = useState<number | null>(null);

    const startGame = () => {
        setStage(createStage());
        resetCursor();
        setDelay(1000);
    };

    const checkCollision = (pos: Pos) => {
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

    const moveCursor = (X: number) => {
        if (!checkCollision({
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
        if (!checkCollision({
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

    const dropBurst = () => {
        let Y = 1;
        while (!checkCollision({
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

    const dropBurstCursor = () => {
        setDelay(null);
        dropBurst();
    }

    const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        const { key } = e;

        if (key === 'ArrowDown') {
            setDelay(1000);
        } else if (key === ' ') {
            setDelay(1000);
        }
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const { key } = e;
        
        if (key === 'ArrowLeft') {
            moveCursor(-1);
        } else if (key === 'ArrowRight') {
            moveCursor(1);
        } else if (key === 'ArrowDown') {
            dropCursor();
        } else if (key === ' ') {
            dropBurstCursor();
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