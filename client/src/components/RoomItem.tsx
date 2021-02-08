import React from 'react';
import styled from 'styled-components';
import { WaitingPlayer } from '../../../server/src/socket/users';

const RoomItemBlock = styled.div`
    display: flex;
    position: relative;
    padding: 16px;
    border: 3px solid #E8E8E8;
    border-radius: 20px;
    background: #D3D7DB;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: #B3B7BC;
    }
`;

interface RoomItemProps {
    roomId: number;
    title: string;
    password: string;
    players: WaitingPlayer;
    current: number;
    max: 2 | 4 | 8;
    mode: 'single' | 'double';
    isStart: boolean;
    onJoinRoom: (roomId: number) => void;
}

function RoomItem({ roomId, title, password, current, max, mode, onJoinRoom }: RoomItemProps) {
    const handleJoinRoom = () => {
        if (current >= max) {
            return alert('정원이 초과되었습니다.');
        }

        if (password && password !== prompt('비밀번호를 입력해주세요.')) {
            return alert('비밀번호가 일치하지 않습니다.');
        }

        onJoinRoom(roomId);
    };

    return (
        <RoomItemBlock
            onClick={handleJoinRoom}
        >
            [{roomId}]
            [{mode}]
            {title}
            {password && '(private)'}
            <br />
            {current} / {max}
        </RoomItemBlock>
    );
}

export default RoomItem;