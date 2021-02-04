import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 48px;
    color: #AA2222;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`;

interface TetrisOverlayProps {
    text: string;
}

function TetrisOverlay({ text }: TetrisOverlayProps) {
    return (
        <Wrapper>
            {text}
        </Wrapper>
    );
}

export default TetrisOverlay;