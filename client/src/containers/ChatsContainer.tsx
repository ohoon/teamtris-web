import React from 'react';
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';

const chatTemplate = [
    {
        id: 1,
        sender: '홍길동',
        message: 'ㅋㅋㅋㅋㅋㅋㅋ'
    },
    {
        id: 2,
        sender: '홍길동',
        message: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'
    },
    {
        id: 3,
        sender: '홍길동',
        message: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'
    },
    {
        id: 4,
        sender: '심청',
        message: 'ㅋㅋㅋㅋㅋㅋ'
    },
    {
        id: 5,
        sender: '흥부',
        message: 'ㅎㅎㅎㅎ'
    },
    {
        id: 6,
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