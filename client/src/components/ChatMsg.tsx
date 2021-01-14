import React from 'react';

interface ChatMsgProps {
    key: number;
    sender: string;
    message: string;
}

function ChatMsg({ sender, message }: ChatMsgProps) {
    return (
        <div>
            {sender}: {message}
        </div>
    );
}

export default ChatMsg;