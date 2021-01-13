import React from 'react';
import { login, LoginInputs } from '../api/auth';
import LoginForm from '../components/LoginForm';

function LoginContainer() {
    const onSubmit = async (input: LoginInputs) => {
        const result = await login(input);
        console.log(result);
    };

    return (
        <LoginForm
            onSubmit={onSubmit}
        />
    );
}

export default LoginContainer;