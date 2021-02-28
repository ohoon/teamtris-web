import React, { ChangeEvent, FormEvent, useState, memo } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { RoomInputs } from '../socket/rooms';
import { StyledDialogBox, StyledDialogHead, StyledDialogBody } from './styled/StyledDialog';
import { StyledSubmitButton, StyledCloseButton } from './styled/StyledButton';

interface CreateRoomDialogProps {
    onClose: (name: string) => void;
    onSubmit: (input: RoomInputs) => void;
}

function CreateRoomDialog({ onClose, onSubmit }: CreateRoomDialogProps) {
    const [input, setInput] = useState<RoomInputs>({
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
        onClose('createRoom');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(input);
        handleClose();
    };

    return (
        <StyledDialogBox>
            <StyledDialogHead>
                방 만들기
                <StyledCloseButton
                    onClick={handleClose}
                />
            </StyledDialogHead>
            <StyledDialogBody>
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
                            <StyledSubmitButton
                                type="submit"
                                size="lg"
                                block
                            >
                                생성
                            </StyledSubmitButton>
                        </Col>
                    </Form.Group>
                </Form>
            </StyledDialogBody>
        </StyledDialogBox>
    );
}

export default memo(CreateRoomDialog);