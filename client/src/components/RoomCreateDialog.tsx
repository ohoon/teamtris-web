import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { RoomCreateInputs } from '../socket/rooms';

const DialogBlock = styled.div`
    border: 3px solid #E8E8E8;
    background: white;

    .head {
        padding: 1px 10px 1px 10px;
        border: 3px solid #E8E8E8;
        background: #D3D7DB;
        font-weight: bold;
        font-size: 12px;
    }

    .body {
        width: 400px;
        padding: 32px;
        border: 3px solid #E8E8E8;
        background: #EEEEEE;
        overflow-y: auto;
        font-size: 14px;
    }
`;

const CloseButton = styled.div`
    width: 12px;
    height: 12px;
    margin-top: 3px;
    float: right;
    border-radius: 6px;
    background: #EE5555;

    &:hover {
        background: #FF7777;
    }
`;

const CreateButton = styled(Button)`
    margin: 16px auto;
    margin-bottom: 0;
`;

interface RoomCreateDialogProps {
    onClose: (name: string) => void;
    onSubmit: (input: RoomCreateInputs) => void;
}

function RoomCreateDialog({ onClose, onSubmit }: RoomCreateDialogProps) {
    const [input, setInput] = useState<RoomCreateInputs>({
        title: '',
        password: '',
        max: 8,
        mode: 'single'
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(input => ({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleClose = () => {
        onClose('roomCreate');
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(input);
        handleClose();
    };

    return (
        <DialogBlock>
            <div
                className="head"
            >
                방 만들기
                <CloseButton
                    onClick={handleClose}
                />
            </div>
            <Form
                className="body"
                onSubmit={handleSubmit}
            >
                <Form.Group
                    as={Row}
                >
                    <Form.Label
                        column
                        sm="3"
                    >
                        방 제목
                    </Form.Label>
                    <Col
                        sm="9"
                    >
                        <Form.Control
                            name="title"
                            type="text"
                            placeholder="테트리스 같이 해요"
                            value={input.title}
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                >
                    <Form.Label
                        column
                        sm="3"
                    >
                        비밀번호
                    </Form.Label>
                    <Col
                        sm="9"
                    >
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="입력 시 비공개방으로 전환"
                            value={input.password}
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                >
                    <Form.Label
                        column
                        sm="3"
                    >
                        인원 수
                    </Form.Label>
                    <Col
                        sm="9"
                    >
                        <Form.Control
                            name="max"
                            as="select"
                            value={input.max}
                            onChange={onChange}
                        >
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                >
                    <Form.Label
                        column
                        sm="3"
                    >
                        게임 모드
                    </Form.Label>
                    <Col
                        sm="9"
                    >
                        <Form.Control
                            name="mode"
                            as="select"
                            value={input.mode}
                            onChange={onChange}
                        >
                            <option value="single">개인전</option>
                            <option value="double">팀전</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                >
                    <Col>
                        <CreateButton
                            type="submit"
                            size="lg"
                            block
                        >
                            생성
                        </CreateButton>
                    </Col>
                </Form.Group>
            </Form>
        </DialogBlock>
    );
}

export default RoomCreateDialog;