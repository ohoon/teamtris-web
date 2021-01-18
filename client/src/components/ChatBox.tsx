import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import socket from '../socket';
import { Chat, ChatLog } from '../socket/chats';
import ChatMsg from './ChatMsg';

const ChatBoxBlock = styled.div`
    height: 200px;
    padding: 10px;
    background: #EEEEEE;
    border: 3px solid #E8E8E8;
    font-size: 12px;
    overflow-y: auto;
`;

function ChatBox() {
    const [chats, setChats] = useState<ChatLog>([]);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight })
    };

    useEffect(() => {
        socket.on('receive chat', (chat: Chat) => {
            setChats(chats => chats.concat(chat));
            scrollToBottom();
        })
    }, []);

    return (
        <ChatBoxBlock
            ref={chatBoxRef}
        >
            {chats.map(chat =>
                <ChatMsg
                    key={chat.id}
                    id={chat.id}
                    sender={chat.sender}
                    message={chat.message}
                />
            )}
        </ChatBoxBlock>
    );
}

export default ChatBox;