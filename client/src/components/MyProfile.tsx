import React from 'react';
import styled from 'styled-components';
import { Button, ProgressBar } from 'react-bootstrap';
import { Me } from '../api/users';

const Wrapper = styled.div`
    height: 100%;
    padding: 24px 8px 24px 8px;
    border-top: 1px solid #D8D8D8;
    border-right: 1px solid #D8D8D8;
`;

const MyProfileBlock = styled.div`
    display: flex;
    margin-bottom: 1.5rem;

    .profile-image {
        width: 96px;
        height: 96px;
        border-radius: 15%;
        padding: 3%;
    }
`;

const UserInfo = styled.div`
    width: 100%;
    padding: 2%;

    .name {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 16px;
    }
`;

const LevelIcon = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 3px;
    margin-right: 6px;
    background: grey;
    color: white;
    font-size: 11px;
`;

const RankingButton = styled(Button)`
    position: absolute;
    right: 6%;
    top: 10%;
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
    onRanking: () => void;
}

function MyProfile({ nickname, profileImage, level, exp, win, lose, onRanking }: MyProfileProps) {
    const total = win + lose;
    const winningRate = Math.round((total > 0 ? win / total : 0) * 100);
    return (
        <Wrapper>
            <MyProfileBlock>
                <img
                    className="profile-image"
                    src={profileImage}
                    alt="profileImage"
                />
                <RankingButton
                    variant="dark"
                    size="sm"
                    onClick={onRanking}
                >
                    랭킹
                </RankingButton>
                <UserInfo>
                    <p
                        className="name"
                    >
                        <LevelIcon>
                            {level}
                        </LevelIcon>
                        {nickname}
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