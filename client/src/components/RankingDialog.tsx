import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { User } from '../api/users';
import { StyledDialogBox, StyledDialogHead, StyledDialogBody } from './styled/StyledDialog';
import { StyledCloseButton } from './styled/StyledButton';
import { StyledUserItem } from './styled/StyledUserList';
import { StyledLevelIconSmall } from './styled/StyledIcon';

interface RankingDialogProps {
    users: User[];
    onClose: (name: string) => void;
}

function RankingDialog({ users, onClose }: RankingDialogProps) {
    const handleClose = () => {
        onClose('ranking');
    };

    return (
        <StyledDialogBox>
            <StyledDialogHead>
                사용자 랭킹
                <StyledCloseButton
                    onClick={handleClose}
                />
            </StyledDialogHead>
            <StyledDialogBody>
                <Row
                    lg={2}
                    md={2}
                    sm={2}
                    xs={2}
                >
                    {users
                        .sort((u1, u2) => u2.level! - u1.level!)
                        .map((user, index) =>
                            <>
                                <Col
                                    key={index + 1}
                                    lg={8}
                                    md={8}
                                    sm={8}
                                    xs={8}
                                >
                                    <StyledUserItem>
                                        {index + 1}등
                                        <StyledLevelIconSmall>
                                            {user.level}
                                        </StyledLevelIconSmall>
                                        {user.nickname}
                                    </StyledUserItem>
                                </Col>
                                <Col
                                    lg={4}
                                    md={4}
                                    sm={4}
                                    xs={4}
                                >
                                    {user.win}승 {user.lose}패
                                </Col>
                            </>
                    )}
                </Row>
            </StyledDialogBody>
        </StyledDialogBox>
    );
}

export default RankingDialog;