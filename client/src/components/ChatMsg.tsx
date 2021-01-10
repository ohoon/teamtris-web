import React from 'react';
import { Chat } from '../modules/chats';

interface ChatMsgProps {
    chat: Chat;
}

function ChatMsg({ chat }: ChatMsgProps) {
    return (
        <div>
            {chat.sender}: {chat.message}
        </div>
    );
}

export default ChatMsg;