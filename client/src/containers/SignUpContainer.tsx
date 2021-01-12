import React from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpInputs, createUser } from '../api/users';
import SignUpForm from '../components/SignUpForm';

function SignUpContainer() {
    const history = useHistory();

    const onSubmit = async (input: SignUpInputs) => {
        await createUser(input);
        alert('가입이 완료되었습니다.');
        history.push('/login');
    }

    return (
        <SignUpForm
            onSubmit={onSubmit}
        />
    );
}

export default SignUpContainer;