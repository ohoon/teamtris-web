import React from 'react';
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';
import { ChatLog } from '../socket/chats';

const chatTemplate: ChatLog = [];

function ChatBoxContainer() {
    return (
        <>
            <ChatBox
                chats={chatTemplate}
            />
            <ChatInput />
        </>
    );
}

export default ChatBoxContainer;