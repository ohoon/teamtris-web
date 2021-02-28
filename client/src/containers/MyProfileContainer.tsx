import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../modules';
import { showDialog } from '../modules/dialog';
import MyProfile from '../components/MyProfile';
import { StyledMyProfileWrapperNotLoggedIn } from '../components/styled/StyledProfile';

function MyProfileContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);
    const dispatch = useDispatch();

    const history = useHistory();
    const goToLogin = () => history.push('/login');

    const onRanking = () => dispatch(showDialog('ranking'));

    if (!me) {
        return (
            <StyledMyProfileWrapperNotLoggedIn>
                <p>
                    로그인이 필요합니다.
                </p>
                <Button
                    onClick={goToLogin}
                >
                    로그인
                </Button>
            </StyledMyProfileWrapperNotLoggedIn>
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

export default memo(MyProfileContainer);