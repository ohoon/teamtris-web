import React from 'react';
import { Chat } from '../socket/chats';

interface ChatMsgProps extends Chat {
    key: number;
}

function ChatMsg({ sender, message }: ChatMsgProps) {
    return (
        <div>
            {sender}: {message}
        </div>
    );
}

export default ChatMsg;