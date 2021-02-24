import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { User } from '../api/users';

const DialogBlock = styled.div`
    border: 1px solid #D8D8D8;

    .head {
        padding: 3px 12px 3px 12px;
        border: 1px solid #747E87;
        background: #727F8C;
        font-weight: bold;
        font-size: 13px;
    }

    .body {
        width: 400px;
        padding: 32px;
        background: #EEE;
        overflow-y: auto;
        font-size: 14px;
    }
`;

const UserItemBlock = styled.li`
    display: flex;
    align-items: center;
`;

const LevelIcon = styled.div`
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 3px;
    margin: 0 6px 0 32px;
    background: grey;
    color: white;
    font-size: 10px;
`;

const CloseButton = styled.div`
    width: 12px;
    height: 12px;
    margin-top: 3px;
    float: right;
    border-radius: 6px;
    background: #EE5555;

    &:hover {
        background: #FF7777;
    }
`;

interface RankingDialogProps {
    users: User[];
    onClose: (name: string) => void;
}

function RankingDialog({ users, onClose }: RankingDialogProps) {
    const handleClose = () => {
        onClose('ranking');
    };

    return (
        <DialogBlock>
            <div
                className="head"
            >
                사용자 랭킹
                <CloseButton
                    onClick={handleClose}
                />
            </div>
            <div
                className="body"
            >
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
                                    <UserItemBlock>
                                        {index + 1}등
                                        <LevelIcon>
                                            {user.level}
                                        </LevelIcon>
                                        {user.nickname}
                                    </UserItemBlock>
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
            </div>
        </DialogBlock>
    );
}

export default RankingDialog;