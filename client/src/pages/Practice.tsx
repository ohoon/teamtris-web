import React from 'react';
import styled from 'styled-components';
import TetrisPracticeContainer from '../containers/TetrisPracticeContainer';

const Wrapper = styled.div`
    width: 40%;
    margin: 100px auto;
`;

function Game() {
    return (
        <Wrapper>
            <TetrisPracticeContainer />
        </Wrapper>
    );
}

export default Game;