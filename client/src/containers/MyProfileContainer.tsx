import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../modules';
import MyProfile from '../components/MyProfile';
import { showDialog } from '../modules/dialog';

const LogInButtonBlock = styled.div`
    height: 100%;
    padding: 32px;
    border: 3px solid #E8E8E8;
    background: #EEEEEE;
    text-align: center;
`;

function MyProfileContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);
    const dispatch = useDispatch();

    const history = useHistory();
    const goToLogin = () => history.push('/login');

    const onRanking = () => dispatch(showDialog('ranking'));

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
            nickname={me.nickname}
            profileImage={me.profileImage}
            level={me.level}
            exp={me.exp}
            win={me.win}
            lose={me.lose}
            onRanking={onRanking}
        />
    );
}

export default MyProfileContainer;