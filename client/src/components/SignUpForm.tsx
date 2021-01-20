import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { SignUpInputs } from '../api/users';

const SignUpFormBlock = styled(Form)`
    width: 800px;
    height: 600px;
    margin: 150px auto;
    padding: 100px;
    border: 3px solid #E8E8E8;
    background: #EEEEEE;
`;

const SignUpButton = styled(Button)`
    margin: 50px auto;
`;

interface SignUpFormProps {
    onSubmit: (input: SignUpInputs) => any;
}

function SignUpForm({ onSubmit }: SignUpFormProps) {
    const [input, setInput] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
        email: ''
    });

    const [error, setError] = useState({ });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(input => ({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const err = await onSubmit(input);
        if (err) setError(err);
    };

    return (
        <SignUpFormBlock
            noValidate
            onSubmit={handleSubmit}
        >
            <Form.Group
                as={Row}
            >
                <Form.Label
                    column
                    sm="2"
                >
                    아이디
                </Form.Label>
                <Col
                    sm="10"
                >
                    <Form.Control
                        name="username"
                        type="text"
                        placeholder="아이디를 입력해 주세요"
                        value={input.username}
                        aria-describedby="usernameHelpBlock"
                        isInvalid={'username' in error}
                        onChange={onChange}
                    />
                    {('username' in error) && (error['username']['name'] === 'DuplicateError') ?
                        <Form.Control.Feedback
                            type="invalid"
                        >
                            {error['username']['message']}
                        </Form.Control.Feedback> :
                        <Form.Text id="usernameHelpBlock" muted>
                            5-16자 영문, 숫자로 입력해 주세요.
                        </Form.Text>
                    }

                </Col>
            </Form.Group>
            <Form.Group
                as={Row}
            >
                <Form.Label
                    column
                    sm="2"
                >
                    비밀번호
                </Form.Label>   
                <Col
                    sm="10"
                >
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해 주세요"
                        value={input.password}
                        aria-describedby="passwordHelpBlock"
                        isInvalid={'password' in error}
                        onChange={onChange}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        8-20자 영문, 숫자의 조합으로 입력해 주세요.
                    </Form.Text>
                </Col>
            </Form.Group>
            <Form.Group
                as={Row}
            >
                <Form.Label
                    column
                    sm="2"
                >
                    &nbsp;
                </Form.Label>
                <Col
                    sm="10"
                >
                    <Form.Control
                        name="passwordConfirm"
                        type="password"
                        placeholder="한번 더 입력해 주세요"
                        value={input.passwordConfirm}
                        aria-describedby="passwordConfirmHelpBlock"
                        isInvalid={'passwordConfirm' in error}
                        onChange={onChange}
                    />
                    <Form.Text id="passwordConfirmHelpBlock" muted>
                        입력한 비밀번호와 똑같이 입력해 주세요.
                    </Form.Text>
                </Col>
            </Form.Group>
            <Form.Group
                as={Row}
            >
                <Form.Label
                    column
                    sm="2"
                >
                    닉네임
                </Form.Label>
                <Col
                    sm="10"
                >
                    <Form.Control
                        name="nickname"
                        type="text"
                        placeholder="닉네임을 입력해 주세요"
                        value={input.nickname}
                        aria-describedby="nicknameHelpBlock"
                        isInvalid={'nickname' in error}
                        onChange={onChange}
                    />
                    {('nickname' in error) && (error['nickname']['name'] === 'DuplicateError') ?
                        <Form.Control.Feedback
                            type="invalid"
                        >
                            {error['nickname']['message']}
                        </Form.Control.Feedback> :
                        <Form.Text id="nicknameHelpBlock" muted>
                            2-20자 닉네임을 입력해 주세요.
                        </Form.Text>
                    }
                </Col>
            </Form.Group>
            <Form.Group
                as={Row}
            >
                <Form.Label
                    column
                    sm="2"
                >
                    Email
                </Form.Label>
                <Col
                    sm="10"
                >
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="example@example.com"
                        value={input.email}
                        aria-describedby="emailHelpBlock"
                        isInvalid={'email' in error}
                        onChange={onChange}
                    />
                    <Form.Text id="emailHelpBlock" muted>
                        아이디 또는 비밀번호 찾기에 사용되므로 정확하게 입력해 주세요.
                    </Form.Text>
                </Col>
            </Form.Group>
            <Form.Group>
                <SignUpButton
                    type="submit"
                    size="lg"
                    block
                >
                    회원가입
                </SignUpButton>
            </Form.Group>
        </SignUpFormBlock>
    );
}

export default SignUpForm;