import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

const LoginFormBlock = styled(Form)`
    width: 800px;
    height: 400px;
    margin: 200px auto;
    padding: 100px 200px;
    border: 3px solid #E8E8E8;
    background: #EEEEEE;
`;

function LoginForm() {
    const [input, setInput] = useState({
        id: '',
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
        console.log(input);
    };

    return (
        <LoginFormBlock
            onSubmit={handleSubmit}
        >
            <Form.Group>
                <Form.Control
                    name="id"
                    type="text"
                    placeholder="아이디"
                    value={input.id}
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