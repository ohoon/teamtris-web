import React from 'react';
import styled from 'styled-components';

const ChatInputForm = styled.form`
    width: 80%;
`;

function ChatInput() {
    return (
        <ChatInputForm>
            <input
                type="text"
                placeholder="메시지 보내기"
            />
            <button
                type="submit"
            >
                전송
            </button>
        </ChatInputForm>
    );
}

export default ChatInput;