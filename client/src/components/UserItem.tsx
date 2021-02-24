import React from 'react';
import styled from 'styled-components';

const UserItemBlock = styled.li`
    display: flex;
    align-items: center;
`;

const LevelIcon = styled.div`
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 3px;
    margin-right: 6px;
    background: grey;
    color: white;
    font-size: 10px;
`;

interface UserItemProps {
    socketId: string;
    _id: string;
    nickname: string;
    level: number;
}

function UserItem({ nickname, level }: UserItemProps) {
    return (
        <UserItemBlock>
            <LevelIcon>
                {level}
            </LevelIcon>
            {nickname}
        </UserItemBlock>
    );
}

export default UserItem;