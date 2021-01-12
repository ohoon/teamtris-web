import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Form, Row, Col, Button } from 'react-bootstrap';

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

function SignUpForm() {
    const [input, setInput] = useState({
        userId: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
        email: ''
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
        <SignUpFormBlock
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
                        name="userId"
                        type="text"
                        placeholder="아이디를 입력해 주세요"
                        aria-describedby="userIdHelpBlock"
                        onChange={onChange}
                    />
                    <Form.Text id="userIdHelpBlock" muted>
                        5~20자 영문, 숫자로 입력해 주세요.
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
                    비밀번호
                </Form.Label>   
                <Col
                    sm="10"
                >
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해 주세요"
                        aria-describedby="passwordHelpBlock"
                        onChange={onChange}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        8~20자의 영문, 숫자, 특수문자 조합으로 입력해 주세요.
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
                        aria-describedby="passwordConfirmHelpBlock"
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
                        aria-describedby="nicknameHelpBlock"
                        onChange={onChange}
                    />
                    <Form.Text id="nicknameHelpBlock" muted>
                        2~20자 닉네임을 입력해 주세요.
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
                    Email
                </Form.Label>
                <Col
                    sm="10"
                >
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="example@example.com"
                        aria-describedby="emailHelpBlock"
                        onChange={onChange}
                    />
                    <Form.Text id="emailHelpBlock" muted>
                        아이디/비밀번호 찾기에 사용되므로 정확하게 입력해 주세요.
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