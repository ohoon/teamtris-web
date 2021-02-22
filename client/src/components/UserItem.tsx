import React from 'react';

interface UserItemProps {
    socketId: string;
    _id: string;
    nickname: string;
    level: number;
}

function UserItem({ nickname, level }: UserItemProps) {
    return (
        <li>
            [{level}]
            &nbsp;
            {nickname}
        </li>
    );
}

export default UserItem;