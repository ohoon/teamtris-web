import React from 'react';
import UserProfile from '../components/UserProfile';

const profileTemplate = {
    id: 1323,
    username: 'gildong',
    nickname: '홍길동'
};

function UserProfileContainer() {
    return (
        <UserProfile
            user={profileTemplate}
        />
    );
}

export default UserProfileContainer;