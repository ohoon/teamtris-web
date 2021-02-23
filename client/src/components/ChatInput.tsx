import React, { ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const ChatInputBlock = styled.form`
    padding-left: 8px;
`;

interface ChatInputProps {
    input: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    disabled: boolean;
}

function ChatInput({ input, onChange, onSubmit, disabled }: ChatInputProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSubmit();
    };

    return (
        <ChatInputBlock
            onSubmit={handleSubmit}
        >
            <InputGroup>
                <FormControl
                    placeholder="메시지 보내기"
                    value={input}
                    onChange={handleChange}
                    disabled={disabled}
                />
                <InputGroup.Append>
                    <Button
                        type="submit"
                        variant="outline-secondary"
                        disabled={disabled}
                    >
                        전송
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </ChatInputBlock>
    );
}

export default ChatInput;