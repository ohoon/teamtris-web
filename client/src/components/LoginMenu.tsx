import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const LoginMenuBlock = styled.div`
    width: 800px;
    height: 400px;
    margin: 200px auto;
    padding: 100px 200px;
    border: 3px solid #E8E8E8;
    background: #EEEEEE;
`;

function LoginForm() {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `scope=${'https%3A//www.googleapis.com/auth/userinfo.profile'}&` +
    `access_type=${'offline'}&` +
    `include_granted_scopes=${'true'}&` +
    `response_type=${'code'}&` +
    `state=${'state_parameter_passthrough_value'}&` +
    `redirect_uri=${'http%3A//localhost:5000/auth/google'}&` +
    `client_id=${process.env.REACT_APP_TEAMTRIS_GOOGLE_CLIENT_ID}`;
    
    return (
        <LoginMenuBlock>
            <Button
                size="lg"
                block
                href={url}
            >
                Login with Google
            </Button>
        </LoginMenuBlock>
    );
}

export default LoginForm;