import React from 'react';
import styled from 'styled-components';
import { BsFillLockFill } from 'react-icons/bs';
import { WaitingPlayer } from '../../../server/src/socket/users';

const RoomItemBlock = styled.div`
    display: flex;
    align-items: center;
    margin: 4px;
    padding: 16px 20px 16px 20px;
    border: 1px solid #D8D8D8;
    border-radius: 16px;
    background: #D5D9DE;
    font-size: 16px;
    cursor: pointer;

    .roomId {
        font-size: 25px;
        font-weight: bold;
        padding-right: 4%;
        border-right: 1px solid #747E87;
    }

    .people {
        position: absolute;
        right: 6%;
        top: 15%;
        font-size: 13px;
    }
    
    &:hover {
        background: #E0E4E8;
    }
`;

const RoomInfoBlock = styled.div`
    padding-left: 4%;
    border-left: 1px soild;

    .title {
        display: flex;
        align-items: center;
        font-weight: bold;
    }

    .mode {
        font-size: 14px;
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
            <div
                className="roomId"
            >
                {roomId}
            </div>
            <RoomInfoBlock>
                <div
                    className="title"
                >
                    {title}
                    &nbsp;
                    {password && <BsFillLockFill />}
                </div>
                <div
                    className="mode"
                >
                    {mode === 'single' ? '개인전' : '팀전'}
                </div>
            </RoomInfoBlock>
            <div
                className="people"
            >
                {current} / {max}
            </div>
        </RoomItemBlock>
    );
}

export default RoomItem;