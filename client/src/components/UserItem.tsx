import React from 'react';
import { ConnectedUser } from '../socket/users';

interface UserItemProps extends ConnectedUser {

}

function UserItem({ username, nickname }: UserItemProps) {
    return (
        <li>
            {nickname ||
                username
            }
        </li>
    );
}

export default UserItem;