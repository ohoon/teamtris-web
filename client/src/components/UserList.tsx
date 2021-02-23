import React from 'react';
import styled from 'styled-components';
import { ConnectedUser } from '../../../server/src/socket/users';
import UserItem from './UserItem';

const UserListBlock = styled.div`
    height: 100%;
    padding: 8px;
    border-right: 1px solid #D8D8D8;
    
    .head {
        padding: 6px 16px 6px 16px;
        border: 1px solid #747E87;
        border-radius: 5px;
        background: #B2B7C1;
        font-weight: bold;
        font-size: 13px;
    }
    
    .body {
        height: 90%;
        margin: 1% auto;
        padding: 6px 10px 6px 10px;
        list-style: none;
        overflow-x: hidden;
        overflow-y: scroll;
        font-size: 13px;
    }
`;

interface UserListProps {
    users: ConnectedUser;
}

function UserList({ users }: UserListProps) {
    return(
        <UserListBlock>
            <div
                className="head"
            >
                현재 접속자 ({Object.keys(users).length}명)
            </div>
            <ul
                className="body"
            >
                {Object.entries(users).map(([socketId, user], index) =>
                    <UserItem
                        key={index + 1}
                        socketId={socketId}
                        _id={user._id}
                        nickname={user.nickname}
                        level={user.level}
                    />
                )}
            </ul>
        </UserListBlock>
    );
}

export default UserList;