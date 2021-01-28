import React, { memo } from 'react';
import styled from 'styled-components';

const StatusBlock = styled.div`
    margin-top: 10%;
    padding-top: 10%;
    padding-left: 15%;
    border: 5px solid #343A40;
    border-radius: 10px;
    font-size: 14px;
`;

interface TetrisStatusProps {
    score: number;
    rows: number;
    level: number;
}

function TetrisStatus({ score, rows, level }: TetrisStatusProps) {
    return (
        <StatusBlock>
            <p>
                score
                <br />
                {score}
            </p>
            <p>
                rows
                <br />
                {rows}
            </p>
            <p>
                level
                <br />
                {level}
            </p>
        </StatusBlock>
    );
}

export default memo(TetrisStatus);