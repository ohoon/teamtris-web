import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import TetrisOthersContainer from '../containers/TetrisOthersContainer';
import ChatsContainer from '../containers/ChatsContainer';
import TetrisSingleContainer from '../containers/TetrisSingleContainer';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    margin: 60px auto;
`;

const Side = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 16px;
`;

function Game() {
    const room = useSelector((state: RootState) => state.room);
    
    if (!room || !room.isStart) {
        return null;
    }

    return (
        <Wrapper>
            <Side>
                <TetrisOthersContainer />
                <ChatsContainer />
            </Side>
            <TetrisSingleContainer />
        </Wrapper>
    );
}

export default Game;