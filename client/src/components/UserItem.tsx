import React from 'react';

interface UserItemProps {
    socketId: string;
    _id: string;
    username: string;
    nickname: string;
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