import React, { ChangeEvent, FormEvent } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { StyledChatInput } from './styled/StyledChat';

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
        <StyledChatInput
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
        </StyledChatInput>
    );
}

export default ChatInput;