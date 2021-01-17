import React from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpInputs, createUser } from '../api/users';
import SignUpForm from '../components/SignUpForm';

function SignUpContainer() {
    const history = useHistory();

    const onSubmit = async (input: SignUpInputs) => {
        try {
            const result = await createUser(input);
            if (!result.success) {
                throw result.error;
            }
            
            alert('가입이 완료되었습니다.');
            return history.push('/login');
        } catch (err) {
            return err;
        }
    }

    return (
        <SignUpForm
            onSubmit={onSubmit}
        />
    );
}

export default SignUpContainer;