import React, { RefObject, memo } from 'react';
import { Chats } from '../../../server/src/socket/chats';
import { StyledChatBox } from './styled/StyledChat';
import ChatMsg from './ChatMsg';

interface ChatBoxProps {
    chats: Chats;
    chatBoxRef: RefObject<HTMLDivElement>;
}

function ChatBox({ chats, chatBoxRef }: ChatBoxProps) {
    return (
        <StyledChatBox
            ref={chatBoxRef}
        >
            {chats.map((chat, index) =>
                <ChatMsg
                    key={index + 1}
                    sender={chat.sender}
                    message={chat.message}
                />
            )}
        </StyledChatBox>
    );
}

export default memo(ChatBox);