import React, { memo } from 'react';
import LoginMenu from '../components/LoginMenu';

function LoginContainer() {
    return (
        <LoginMenu />
    );
}

export default memo(LoginContainer);