import React from 'react';
import styled from 'styled-components';
import { ProgressBar } from 'react-bootstrap';
import { Me } from '../api/users';

const Wrapper = styled.div`
    height: 100%;
    padding: 16px 10px 16px 10px;
    border: 3px solid #E8E8E8;
    background: #EEEEEE;
`;

const MyProfileBlock = styled.div`
    display: flex;
    margin-bottom: 1.5rem;

    .profile-image {
        width: 100px;
        height: 100px;
    }
`;

const UserInfo = styled.div`
    margin-left: 10px;

    .name {
        font-weight: bold;
        font-size: 16px;
    }
`;

const LevelBar = styled(ProgressBar)`
    position: relative;
    height: 15%;
    border: 1px solid #CCC;
    border-radius: 6px;
    background: #F6F6F6;
`;

const LevelBarLabel = styled.div`
    position: relative;
    bottom: 14%;
    text-align: center;
`;

interface MyProfileProps extends Me {

}

function MyProfile({ username, nickname, level, exp, win, lose }: MyProfileProps) {
    const total = win + lose;
    const winningRate = total > 0 ? win / total : 0;
    return (
        <Wrapper>
            <MyProfileBlock>
                <img
                    className="profile-image"
                    src="male.png"
                    alt="profileImage"
                />
                <UserInfo>
                    <p
                        className="name"
                    >
                        [{level}]
                        &nbsp;
                        {nickname ||
                            username
                        }
                    </p>
                    <p>
                        승률: {winningRate}% ({win}승 {lose}패)
                    </p>
                </UserInfo>
            </MyProfileBlock>
            <LevelBar
                now={(exp / (1000 * Math.pow(2, level - 1))) * 100}
                animated
            />
            <LevelBarLabel>
                {exp} / {1000 * Math.pow(2, level - 1)}
            </LevelBarLabel>
        </Wrapper>
    );
}

export default MyProfile;