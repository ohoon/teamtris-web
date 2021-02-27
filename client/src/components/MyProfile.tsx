import React from 'react';
import { Me } from '../api/users';
import { StyledMyProfileWrapper, StyledMyProfile, StyledProfileImage, StyledMyInfo, StyledUserName } from './styled/StyledProfile';
import { StyledLevelIcon } from './styled/StyledIcon';
import { StyledCornerButton } from './styled/StyledButton';
import { StyledProgressBar, StyledProgressBarLabel } from './styled/StyledProgressBar';

interface MyProfileProps extends Me {
    onRanking: () => void;
}

function MyProfile({ nickname, profileImage, level, exp, win, lose, onRanking }: MyProfileProps) {
    const total = win + lose;
    const winningRate = Math.round((total > 0 ? win / total : 0) * 100);
    return (
        <StyledMyProfileWrapper>
            <StyledMyProfile>
                <StyledProfileImage
                    src={profileImage}
                    alt="profileImage"
                />
                <StyledCornerButton
                    variant="dark"
                    size="sm"
                    onClick={onRanking}
                >
                    랭킹
                </StyledCornerButton>
                <StyledMyInfo>
                    <StyledUserName>
                        <StyledLevelIcon>
                            {level}
                        </StyledLevelIcon>
                        {nickname}
                    </StyledUserName>
                    <p>
                        승률: {winningRate}% ({win}승 {lose}패)
                    </p>
                </StyledMyInfo>
            </StyledMyProfile>
            <StyledProgressBar
                now={(exp / (1000 * Math.pow(2, level - 1))) * 100}
                animated
            />
            <StyledProgressBarLabel>
                {exp} / {1000 * Math.pow(2, level - 1)}
            </StyledProgressBarLabel>
        </StyledMyProfileWrapper>
    );
}

export default MyProfile;