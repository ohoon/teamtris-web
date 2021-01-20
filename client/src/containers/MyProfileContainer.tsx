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
    const { data } = useSelector((state: RootState) => state.users.me);

    const history = useHistory();
    const goToLogin = () => history.push('/login');

    if (!data) {
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
            id={data.id}
            username={data.username}
            nickname={data.nickname}
        />
    );
}

export default MyProfileContainer;