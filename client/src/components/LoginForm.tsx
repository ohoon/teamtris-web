import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { LoginInputs } from '../api/auth';

const LoginFormBlock = styled(Form)`
    width: 800px;
    height: 400px;
    margin: 200px auto;
    padding: 100px 200px;
    border: 3px solid #E8E8E8;
    background: #EEEEEE;
`;

interface LoginFormProps {
    onSubmit: (input: LoginInputs) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
    const [input, setInput] = useState({
        username: '',
        password: ''
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(input => ({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(input);
    };

    return (
        <LoginFormBlock
            onSubmit={handleSubmit}
        >
            <Form.Group>
                <Form.Control
                    name="username"
                    type="text"
                    placeholder="아이디"
                    value={input.username}
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    value={input.password}
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group>
                <Button
                    type="submit"
                    size="lg"
                    block
                >
                    로그인
                </Button>
            </Form.Group>
            <Form.Group>
                <Button
                    size="lg"
                    block
                    href="https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http%3A//localhost:5000/auth/google&client_id=820046101652-3ulom2bdgjnuumcrrg5j47095hg8e726.apps.googleusercontent.com"
                >
                    로그인 with Google
                </Button>
            </Form.Group>
            <hr />
            <Link
                to="/signup"
            >
                회원가입
            </Link>
        </LoginFormBlock>
    );
}

export default LoginForm;