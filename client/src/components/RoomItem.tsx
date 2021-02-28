import React from 'react';
import { BsFillLockFill } from 'react-icons/bs';
import { WaitingPlayer } from '../../../server/src/socket/users';
import { StyledRoomItemWrapper, StyledRoomItemRoomId, StyledRoomItemPeople, StyledRoomItemRoomInfo, StyledRoomItemTitle, StyledRoomItemMode } from './styled/StyledRoom';

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
        <StyledRoomItemWrapper
            onClick={handleJoinRoom}
        >
            <StyledRoomItemRoomId>
                {roomId}
            </StyledRoomItemRoomId>
            <StyledRoomItemRoomInfo>
                <StyledRoomItemTitle>
                    {title}
                    &nbsp;
                    {password && <BsFillLockFill />}
                </StyledRoomItemTitle>
                <StyledRoomItemMode>
                    {mode === 'single' ? '개인전' : '팀전'}
                </StyledRoomItemMode>
            </StyledRoomItemRoomInfo>
            <StyledRoomItemPeople>
                {current} / {max}
            </StyledRoomItemPeople>
        </StyledRoomItemWrapper>
    );
}

export default RoomItem;