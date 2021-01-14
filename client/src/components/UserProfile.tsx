import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Profile } from '../modules/users';
import { useHistory } from 'react-router-dom';

const LogInButtonBlock = styled.div`
    height: 200px;
    padding: 32px;
    border: 3px solid #E8E8E8;
    background: #EEEEEE;
    text-align: center;
`;

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
    profile: Profile | null;
}

function UserProfile({ profile }: UserProfileProps) {
    const history = useHistory();
    const goToLogin = () => history.push('/login');
    
    if (!profile) {
        return (
            <LogInButtonBlock>
                <p>
                    로그인이 필요합니다.
                </p>
                <Button
                    onClick={goToLogin}
                >
                    로그인
                </Button>
            </LogInButtonBlock>
        );
    }

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
                {profile.nickname ||
                    profile.username
                }
            </p>
        </UserProfileBlock>
    );
}

export default UserProfile;