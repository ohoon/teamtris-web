import React from 'react';
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';

const chatTemplate = [
    {
        sender: '홍길동',
        message: 'ㅋㅋㅋㅋㅋㅋㅋ'
    },
    {
        sender: '홍길동',
        message: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'
    },
    {
        sender: '홍길동',
        message: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'
    },
    {
        sender: '심청',
        message: 'ㅋㅋㅋㅋㅋㅋ'
    },
    {
        sender: '흥부',
        message: 'ㅎㅎㅎㅎ'
    },
    {
        sender: '놀부',
        message: 'ㅋㅋㅋㅋㅋㅎㅎㅋㅋ'
    }
];

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