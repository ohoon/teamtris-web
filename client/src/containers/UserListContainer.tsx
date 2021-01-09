import React from 'react';
import UserList from '../components/UserList';

const userTemplate = [
    {
        socketId: 31233,
        username: 'ohoon',
        nickname: '영훈님'
    },
    {
        socketId: 51232,
        username: 'john',
        nickname: '존 스노우'
    },
    {
        socketId: 15123,
        username: 'peter',
        nickname: '피터 팬'
    },
    {
        socketId: 532341,
        username: 'sam',
        nickname: null
    },
    {
        socketId: 2323214,
        username: 'paul',
        nickname: '폴 킴'
    }
];

function UserListContainer() {
    return (
        <UserList
            users={userTemplate}
        />
    );
}

export default UserListContainer;