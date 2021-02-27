import React from 'react';
import { StyledUserItem } from './styled/StyledUserList';
import { StyledLevelIconSmall } from './styled/StyledIcon';

interface UserItemProps {
    socketId: string;
    _id: string;
    nickname: string;
    level: number;
}

function UserItem({ nickname, level }: UserItemProps) {
    return (
        <StyledUserItem>
            <StyledLevelIconSmall>
                {level}
            </StyledLevelIconSmall>
            {nickname}
        </StyledUserItem>
    );
}

export default UserItem;