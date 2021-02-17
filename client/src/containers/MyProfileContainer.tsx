import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../modules';
import MyProfile from '../components/MyProfile';

const LogInButtonBlock = styled.div`
    height: 100%;
    padding: 32px;
    border: 3px solid #E8E8E8;
    background: #EEEEEE;
    text-align: center;
`;

function MyProfileContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);

    const history = useHistory();
    const goToLogin = () => history.push('/login');

    if (!me) {
        return (
            <LogInButtonBlock>
                <p>
                    로그인이 필요합니다.
                </p>
                <Button
                    onClick={goToLogin}
                >
                    로그인
                </Button>
            </LogInButtonBlock>
        );
    }

    return (
        <MyProfile
            _id={me._id}
            username={me.username}
            nickname={me.nickname}
            level={me.level}
            exp={me.exp}
            win={me.win}
            lose={me.lose}
        />
    );
}

export default MyProfileContainer;