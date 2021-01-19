import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getAccessToken, LoginInputs } from '../api/auth';
import { getMeThunk } from '../modules/users';
import LoginForm from '../components/LoginForm';

function LoginContainer() {
    const history = useHistory();
    const dispatch = useDispatch();
    const onSubmit = async (input: LoginInputs) => {
        try {
            const result = await getAccessToken(input);
            if (!result.success) {
                throw result;
            }

            const accessToken = result.data;
            localStorage.setItem('ACCESS_TOKEN', accessToken);
            axios.defaults.headers.authorization = `Bearer ${accessToken}`;
            dispatch(getMeThunk());
            history.push('/');
        } catch (err) {
            if (err.error) {
                if (err.error.username) {
                    return alert(err.error.username.message);
                }

                if (err.error.password) {
                    return alert(err.error.password.message);
                }
            }

            alert(err.message);
        }
    };

    return (
        <LoginForm
            onSubmit={onSubmit}
        />
    );
}

export default LoginContainer;