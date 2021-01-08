import React from 'react';
import { UserBlock } from '../modules/users';

interface UserItemProps {
    user: UserBlock;
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