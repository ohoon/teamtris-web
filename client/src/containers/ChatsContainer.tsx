import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../socket';
import { Chat, ChatLog } from '../socket/chats';
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';
import { RootState } from '../modules';

function ChatBoxContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);

    const [chats, setChats] = useState<ChatLog>([]);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    
    const scrollToBottom = () => {
        chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight })
    };
    
    useEffect(() => {
        socket.on('receive chat', (chat: Chat) => {
            setChats(chats => chats.concat(chat));
            scrollToBottom();
        });
        
        return () => {
            socket.removeListener('receive chat');
        };
    }, []);
    
    const [input, setInput] = useState('');
    
    const onChange = (value: string) => {
        setInput(value);
    };
    
    const onSubmit = () => {
        const chat = {
            sender: me ? me.nickname || me.username : null,
            message: input
        };
        
        if (me && input) {
            socket.emit('send chat', chat);
        }
        
        setInput('');
    };

    return (
        <>
            <ChatBox
                chats={chats}
                chatBoxRef={chatBoxRef}
            />
            <ChatInput
                input={input}
                onChange={onChange}
                onSubmit={onSubmit}
                disabled={!me}
            />
        </>
    );
}

export default ChatBoxContainer;