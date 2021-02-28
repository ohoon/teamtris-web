import React, { memo } from 'react';
import { Chat } from '../../../server/src/socket/chats';

interface ChatMsgProps extends Chat {
    
}

function ChatMsg({ sender, message }: ChatMsgProps) {
    return (
        <div>
            {sender}: {message}
        </div>
    );
}

export default ChatMsg;