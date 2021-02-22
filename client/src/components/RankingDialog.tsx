import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { User } from '../api/users';

const DialogBlock = styled.div`
    border: 3px solid #E8E8E8;
    background: white;

    .head {
        padding: 1px 10px 1px 10px;
        border: 3px solid #E8E8E8;
        background: #D3D7DB;
        font-weight: bold;
        font-size: 12px;
    }

    .body {
        width: 400px;
        padding: 32px;
        border: 3px solid #E8E8E8;
        background: #EEEEEE;
        overflow-y: auto;
        font-size: 14px;
    }
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
                                    [{user.level}]
                                    &nbsp;
                                    {user.nickname}
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