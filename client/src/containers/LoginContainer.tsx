import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getAccessToken, LoginInputs } from '../api/auth';
import LoginForm from '../components/LoginForm';

function LoginContainer() {
    const history = useHistory();
    const onSubmit = async (input: LoginInputs) => {
        try {
            const result = await getAccessToken(input);
            if (!result.success) {
                throw new Error(result.message);
            }

            const accessToken = result.data;
            localStorage.setItem('ACCESS_TOKEN', accessToken);
            axios.defaults.headers.authorization = `Bearer ${accessToken}`;
            history.push('/');
        } catch (err) {
            alert(`로그인에 실패하였습니다.`);
        }
    };

    return (
        <LoginForm
            onSubmit={onSubmit}
        />
    );
}

export default LoginContainer;