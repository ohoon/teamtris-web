import React, { memo } from 'react';
import styled from 'styled-components';
import TetrisStageCell from './TetrisStageCell';

const Wrapper = styled.div`
    margin-top: 50%;
`;

const GarbageBarBlock = styled.div`
    width: 2vw;
    display: grid;
    grid-template-rows: repeat(
        10,
        2vw
    );
    grid-template-columns: repeat(
        1,
        2vw
    );
    grid-gap: 1px;
    margin: auto;
    background: #111;
`;

interface TetrisGarbageBarProps {
    garbage: number;
}

function TetrisGarbageBar({ garbage }: TetrisGarbageBarProps) {
    const garbageStage = Array(10 - garbage).fill(0).concat(Array(garbage).fill('G'));

    return(
        <Wrapper>
            <GarbageBarBlock>
                {garbageStage.map((type, index) =>
                    <TetrisStageCell
                        key={index + 1}
                        type={type}
                    />
                )}
            </GarbageBarBlock>
        </Wrapper>
    );
}

export default memo(TetrisGarbageBar);