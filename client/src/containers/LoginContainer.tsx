import React from 'react';
import { useHistory } from 'react-router';
import { login, LoginInputs } from '../api/auth';
import LoginForm from '../components/LoginForm';

function LoginContainer() {
    const history = useHistory();

    const onSubmit = async (input: LoginInputs) => {
        const result = await login(input);
        const { data: accessToken } = result;
        
        localStorage.setItem('ACCESS_TOKEN', accessToken);
        history.push('/');
    };

    return (
        <LoginForm
            onSubmit={onSubmit}
        />
    );
}

export default LoginContainer;