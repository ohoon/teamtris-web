import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import DialogContainer from '../containers/DialogContainer';
import UserListContainer from '../containers/UserListContainer';
import RoomListContainer from '../containers/RoomListContainer';
import MyProfileContainer from '../containers/MyProfileContainer';
import ChatsContainer from '../containers/ChatsContainer';

const Wrapper = styled(Container)`
    min-width: 80%;
    margin: 80px auto;
`;

function Home() {
    return (
        <Wrapper>
            <Row>
                <Col
                    md={3}
                >
                    <UserListContainer />
                </Col>
                <Col
                    md={9}
                >
                    <RoomListContainer />
                </Col>
            </Row>
            <Row>
                <Col
                    md={3}
                >
                    <MyProfileContainer />
                </Col>
                <Col
                    md={9}
                >
                    <ChatsContainer />
                </Col>
            </Row>
            <DialogContainer />
        </Wrapper>
    );
}

export default Home;