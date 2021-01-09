import React from 'react';
import RoomList from '../components/RoomList';

const roomTemplate = [
    {
        id: 12314,
        title: '테스트용',
        password: null,
        current: 1,
        max: 2,
        mode: 'single',
        isLock: false
    },
    {
        id: 12315,
        title: '테스트용2',
        password: null,
        current: 1,
        max: 2,
        mode: 'single',
        isLock: false
    },
    {
        id: 12316,
        title: '테스트용3',
        password: null,
        current: 1,
        max: 2,
        mode: 'single',
        isLock: false
    },
    {
        id: 12317,
        title: '테스트용4',
        password: null,
        current: 1,
        max: 2,
        mode: 'single',
        isLock: false
    },
    {
        id: 12318,
        title: '테스트용5',
        password: null,
        current: 1,
        max: 2,
        mode: 'single',
        isLock: false
    },
    {
        id: 12319,
        title: '테스트용6',
        password: null,
        current: 1,
        max: 2,
        mode: 'single',
        isLock: false
    },
    {
        id: 12320,
        title: '테스트용7',
        password: null,
        current: 1,
        max: 2,
        mode: 'single',
        isLock: false
    },
    {
        id: 12321,
        title: '테스트용8',
        password: null,
        current: 1,
        max: 2,
        mode: 'single',
        isLock: false
    },
    {
        id: 12322,
        title: '테스트용9',
        password: null,
        current: 1,
        max: 2,
        mode: 'single',
        isLock: false
    },
    {
        id: 12323,
        title: '테스트용10',
        password: null,
        current: 1,
        max: 2,
        mode: 'single',
        isLock: false
    }
];

function RoomListContainer() {
    return (
        <RoomList
            rooms={roomTemplate}
        />
    );
}

export default RoomListContainer;