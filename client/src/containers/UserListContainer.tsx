import React from 'react';
import UserList from '../components/UserList';
import { ConnectedUsers } from '../socket/users';

const userTemplate: ConnectedUsers = [];

function UserListContainer() {
    return (
        <UserList
            users={userTemplate}
        />
    );
}

export default UserListContainer;