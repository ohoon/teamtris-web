import React, { useState, ChangeEvent, FormEvent } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import socket from '../socket';

interface ChatInputProps {
    sender: string | null;
}

function ChatInput({ sender }: ChatInputProps) {
    const [message, setMessage] = useState('');
    const chat = {
        sender: sender,
        message: message
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (sender && message) socket.emit('send chat', chat);
        setMessage('');
    };

    return (
        <form
            onSubmit={onSubmit}
        >
            <InputGroup>
                <FormControl
                    placeholder="메시지 보내기"
                    value={message}
                    onChange={onChange}
                    disabled={!sender}
                />
                <InputGroup.Append>
                    <Button
                        type="submit"
                        variant="outline-secondary"
                        disabled={!sender}
                    >
                        전송
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </form>
    );
}

export default ChatInput;