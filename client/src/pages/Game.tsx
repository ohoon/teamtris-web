import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import TetrisOthersContainer from '../containers/TetrisOthersContainer';
import ChatsContainer from '../containers/ChatsContainer';
import TetrisContainer from '../containers/TetrisContainer';
import { useHistory } from 'react-router';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    margin: 32px auto;
`;

const Side = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 16px;
`;

function Game() {
    const room = useSelector((state: RootState) => state.room);
    const history = useHistory();
    
    if (!room) {
        history.push('/');
        return null;
    }

    return (
        <Wrapper>
            <Side>
                <TetrisOthersContainer />
                <ChatsContainer />
            </Side>
            <TetrisContainer />
        </Wrapper>
    );
}

export default Game;