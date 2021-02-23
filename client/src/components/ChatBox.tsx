import React, { RefObject } from 'react';
import styled from 'styled-components';
import { Chats } from '../../../server/src/socket/chats';
import ChatMsg from './ChatMsg';

const ChatBoxBlock = styled.div`
    height: 200px;
    padding: 12px;
    border-top: 1px solid #D8D8D8;
    font-size: 13px;
    word-break: break-all;
    overflow-y: auto;
`;

interface ChatBoxProps {
    chats: Chats;
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