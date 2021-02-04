import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ size: number }>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: ${props => props.size}vw;
    color: #AA2222;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`;

interface TetrisOverlayProps {
    text: string;
    size: number;
}

function TetrisOverlay({ text, size }: TetrisOverlayProps) {
    return (
        <Wrapper
            size={size}
        >
            {text}
        </Wrapper>
    );
}

export default TetrisOverlay;