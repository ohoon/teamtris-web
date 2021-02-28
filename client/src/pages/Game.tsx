import React, { memo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import TetrisOthersContainer from '../containers/TetrisOthersContainer';
import ChatsContainer from '../containers/ChatsContainer';
import TetrisContainer from '../containers/TetrisContainer';
import { useHistory } from 'react-router';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    margin: 32px auto;
    border-radius: 5px;
    background: #EEE;
`;

const Side = styled.div`
    display: flex;
    width: 100%;
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

export default memo(Game);