import React, { memo } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import RoomLobbyContainer from '../containers/RoomLobbyContainer';
import UserListContainer from '../containers/UserListContainer';
import RoomListContainer from '../containers/RoomListContainer';
import MyProfileContainer from '../containers/MyProfileContainer';
import ChatsContainer from '../containers/ChatsContainer';

const Wrapper = styled(Container)`
    min-width: 75%;
    margin: 80px auto;
    padding: 0.8rem;
    border: 0px;
    border-radius: 5px;
    background: #EEE;
`;

function Home() {
    const room = useSelector((state: RootState) => state.room);

    return (
        <Wrapper>
            <Row
                noGutters
            >
                {room ?
                    <>
                        <Col>
                            <RoomLobbyContainer />
                        </Col>
                    </> :
                    <>
                        <Col
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                        >
                            <UserListContainer />
                        </Col>
                        <Col
                            lg={9}
                            md={9}
                            sm={9}
                            xs={9}
                        >
                            <RoomListContainer />
                        </Col>
                    </>
                }
            </Row>
            <Row
                noGutters
            >
                <Col
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                >
                    <MyProfileContainer />
                </Col>
                <Col
                    lg={9}
                    md={9}
                    sm={9}
                    xs={9}
                >
                    <ChatsContainer />
                </Col>
            </Row>
        </Wrapper>
    );
}

export default memo(Home);