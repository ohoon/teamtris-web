import React from 'react';
import styled from 'styled-components';
import { UserBlock } from '../modules/users';
import UserItem from './UserItem';

const UserListBlock = styled.div`
    width: 20%;

    .head {
        padding: 1px 10px 1px 10px;
        border: 3px solid #E8E8E8;
        background: #D3D7DB;
        font-weight: bold;
        font-size: 12px;
    }
    
    .body {
        height: 400px;
        margin: 0 auto;
        padding: 6px 10px 6px 10px;
        border: 3px solid #E8E8E8;
        background: #EEEEEE;
        list-style: none;
        overflow-x: hidden;
        overflow-y: scroll;
        font-size: 13px;
    }
`;

interface UserListProps {
    users: UserBlock[];
}

function UserList({ users }: UserListProps) {
    return(
        <UserListBlock>
            <div
                className="head"
            >
                현재 접속자 목록 ({users.length}명)
            </div>
            <ul
                className="body"
            >
                {users.map(user =>
                    <UserItem
                        user={user}
                    />
                )}
            </ul>
        </UserListBlock>
    );
}

export default UserList;