import React from 'react';
import { useSelector } from 'react-redux';
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';
import { RootState } from '../modules';

function ChatBoxContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);
    
    return (
        <>
            <ChatBox />
            <ChatInput
                sender={me ? me.nickname || me.username : null}
            />
        </>
    );
}

export default ChatBoxContainer;