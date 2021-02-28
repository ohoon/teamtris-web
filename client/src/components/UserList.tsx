import React, { memo } from 'react';
import { ConnectedUser } from '../../../server/src/socket/users';
import { StyledUserListWrapper, StyledUserListHead, StyledUserListBody } from './styled/StyledUserList';
import UserItem from './UserItem';

interface UserListProps {
    users: ConnectedUser;
}

function UserList({ users }: UserListProps) {
    return(
        <StyledUserListWrapper>
            <StyledUserListHead>
                현재 접속자 ({Object.keys(users).length}명)
            </StyledUserListHead>
            <StyledUserListBody>
                {Object.entries(users).map(([socketId, user], index) =>
                    <UserItem
                        key={index + 1}
                        socketId={socketId}
                        _id={user._id}
                        nickname={user.nickname}
                        level={user.level}
                    />
                )}
            </StyledUserListBody>
        </StyledUserListWrapper>
    );
}

export default memo(UserList);