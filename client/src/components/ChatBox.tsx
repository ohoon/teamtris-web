import React, { RefObject } from 'react';
import styled from 'styled-components';
import { ChatLog } from '../socket/chats';
import ChatMsg from './ChatMsg';

const ChatBoxBlock = styled.div`
    height: 200px;
    padding: 10px;
    background: #EEEEEE;
    border: 3px solid #E8E8E8;
    font-size: 12px;
    word-break: break-all;
    overflow-y: auto;
`;

interface ChatBoxProps {
    chats: ChatLog;
    chatBoxRef: RefObject<HTMLDivElement>;
}

function ChatBox({ chats, chatBoxRef }: ChatBoxProps) {
    return (
        <ChatBoxBlock
            ref={chatBoxRef}
        >
            {chats.map((chat, index) =>
                <ChatMsg
                    key={index + 1}
                    sender={chat.sender}
                    message={chat.message}
                />
            )}
        </ChatBoxBlock>
    );
}

export default ChatBox;