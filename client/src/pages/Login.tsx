import React, { memo } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import LoginContainer from '../containers/LoginContainer';

const Wrapper = styled(Container)`
    width: 80%;
    text-align: center;
`;

function Login() {
    return (
        <Wrapper>
            <LoginContainer />
        </Wrapper>
    );
}

export default memo(Login);