import React from 'react';
import styled from 'styled-components';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const ChatInputForm = styled.form`
    width: 80%;
`;

function ChatInput() {
    return (
        <ChatInputForm>
            <InputGroup>
                <FormControl
                    placeholder="메시지 보내기"
                />
                <InputGroup.Append>
                    <Button
                        type="submit"
                        variant="outline-secondary"
                    >
                        전송
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </ChatInputForm>
    );
}

export default ChatInput;