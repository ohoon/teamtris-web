import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function ChatInput() {
    return (
        <form>
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
        </form>
    );
}

export default ChatInput;