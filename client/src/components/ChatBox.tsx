import React from 'react';
import styled from 'styled-components';
import { ChatLog } from '../modules/chats';
import ChatMsg from './ChatMsg';

const ChatBoxBlock = styled.div`
    height: 200px;
    padding: 10px;
    background: #EEEEEE;
    border: 3px solid #E8E8E8;
    font-size: 12px;
    overflow-y: auto;
`;

interface ChatBoxProps {
    chats: ChatLog;
}

function ChatBox({ chats }: ChatBoxProps) {
    return (
        <ChatBoxBlock>
            {chats.map(chat =>
                <ChatMsg
                    chat={chat}
                />    
            )}
        </ChatBoxBlock>
    );
}

export default ChatBox;