import React from 'react';
import styled from 'styled-components';
import { Button, ProgressBar } from 'react-bootstrap';
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
        border: 0px;
        border-radius: 15%;
        padding: 3%;
    }
`;

const UserInfo = styled.div`
    width: 100%;
    margin: 0 10px 0 10px;

    .name {
        font-weight: bold;
        font-size: 16px;
    }
`;

const RankingButton = styled(Button)`
    float: right;
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
                <UserInfo>
                    <p
                        className="name"
                    >
                        [{level}]
                        &nbsp;
                        {nickname}
                        <RankingButton
                            variant="dark"
                            size="sm"
                            onClick={onRanking}
                        >
                            랭킹
                        </RankingButton>
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