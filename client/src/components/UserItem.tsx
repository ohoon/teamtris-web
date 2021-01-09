import React from 'react';
import { CurrentUser } from '../modules/users';

interface UserItemProps {
    user: CurrentUser;
}

function UserItem({ user }: UserItemProps) {
    return (
        <li
            key={user.socketId}
        >
            {user.nickname ||
                user.username
            }
        </li>
    );
}

export default UserItem;