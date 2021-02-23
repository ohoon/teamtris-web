import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { CurrentRoom, RoomInputs } from '../socket/rooms';

const DialogBlock = styled.div`
    border: 1px solid #D8D8D8;

    .head {
        padding: 3px 12px 3px 12px;
        border: 1px solid #747E87;
        background: #B2B7C1;
        font-weight: bold;
        font-size: 13px;
    }

    .body {
        width: 400px;
        padding: 32px;
        background: #EEE;
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

const EditButton = styled(Button)`
    margin: 16px auto;
    margin-bottom: 0;
`;

interface EditRoomDialogProps {
    room: CurrentRoom;
    onClose: (name: string) => void;
    onSubmit: (input: RoomInputs) => void;
}

function EditRoomDialog({ room, onClose, onSubmit }: EditRoomDialogProps) {
    const [input, setInput] = useState<RoomInputs>({
        title: room.title,
        password: room.password,
        max: room.max,
        mode: room.mode
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(input => ({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleClose = () => {
        onClose('editRoom');
    };

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
                방 설정
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
                            type="text"
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
                        <EditButton
                            type="submit"
                            size="lg"
                            block
                        >
                            수정
                        </EditButton>
                    </Col>
                </Form.Group>
            </Form>
        </DialogBlock>
    );
}

export default EditRoomDialog;