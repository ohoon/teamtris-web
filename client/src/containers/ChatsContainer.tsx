import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import socket from '../socket';
import { Chat, Chats } from '../../../server/src/socket/chats';
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';

function ChatBoxContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);
    const room = useSelector((state: RootState) => state.room);

    const [chats, setChats] = useState<Chats>([]);
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
            sender: me ? me.nickname : null,
            message: input
        };
        
        if (me && input) {
            socket.emit('send chat', chat, room ? `room${room.roomId}` : 'channel');
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