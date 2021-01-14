import React from 'react';

interface UserItemProps {
    key: number;
    username: string;
    nickname: string | null;
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