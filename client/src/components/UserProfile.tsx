import React from 'react';
import styled from 'styled-components';
import { Profile } from '../modules/users';

const UserProfileBlock = styled.div`
    display: flex;
    height: 200px;
    padding: 16px 10px 16px 10px;
    border: 3px solid #E8E8E8;
    background: #EEEEEE;

    .profile-image {
        width: 100px;
        height: 100px;
    }

    .name {
        margin-left: 10px;
        font-weight: bold;
        font-size: 16px;
    }
`;

interface UserProfileProps {
    user: Profile;
}

function UserProfile({ user }: UserProfileProps) {
    return (
        <UserProfileBlock>
            <img
                className="profile-image"
                src="male.png"
                alt="profileImage"
            />
            <p
                className="name"
            >
                {user.nickname ||
                    user.username
                }
            </p>
        </UserProfileBlock>
    );
}

export default UserProfile;