import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { StyledLoginMenu } from './styled/StyledLoginMenu';

function LoginForm() {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `scope=${'https%3A//www.googleapis.com/auth/userinfo.profile'}&` +
    `access_type=${'offline'}&` +
    `include_granted_scopes=${'true'}&` +
    `response_type=${'code'}&` +
    `state=${'state_parameter_passthrough_value'}&` +
    `redirect_uri=${'http%3A//localhost:5000/auth/google'}&` +
    `client_id=${process.env.REACT_APP_TEAMTRIS_GOOGLE_CLIENT_ID}`;
    alert(process.env);
    
    return (
        <StyledLoginMenu>
            <Button
                size="lg"
                variant="info"
                block
                href={url}
            >
                Login with Google
            </Button>
        </StyledLoginMenu>
    );
}

export default memo(LoginForm);