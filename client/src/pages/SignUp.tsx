import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import SignUpContainer from '../containers/SignUpContainer';

const Wrapper = styled(Container)`
    width: 80%;
`;

function SignUp() {
    return (
        <Wrapper>
            <SignUpContainer />
        </Wrapper>
    );
}

export default SignUp;