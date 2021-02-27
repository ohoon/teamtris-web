import React from 'react';
import { BsX } from 'react-icons/bs';
import socket from '../socket';
import { StyledRoomSlot, StyledRoomPlayer, StyledRoomPlayerStatus, StyledRoomTeam } from './styled/StyledRoom';
import { StyledProfileImage } from './styled/StyledProfile';
import { StyledKickButton } from './styled/StyledButton';

interface RoomLobbySlotProps {
    socketId: string;
    _id: string;
    nickname: string;
    profileImage: string;
    isReady: boolean;
    isMaster: boolean;
    team?: string;
    onChangeTeam?: () => void;
    onKickPlayer?: (socketId: string) => void;
}

function RoomLobbySlot({ socketId, nickname, profileImage, isReady, isMaster, team, onChangeTeam, onKickPlayer }: RoomLobbySlotProps) {
    return (
        <StyledRoomSlot
            team={team}
        >
            <StyledProfileImage
                src={profileImage}
                alt="profileImage"
            />
            <StyledRoomPlayerStatus>
                {isMaster ? "방장" : isReady && "준비 완료"}
            </StyledRoomPlayerStatus>
            <StyledRoomPlayer>
                {nickname}
                {onKickPlayer && !isMaster && socket.id !== socketId ?            
                    <StyledKickButton
                        onClick={() => onKickPlayer(socketId)}
                    >
                        <BsX />
                    </StyledKickButton> :
                    null
                }
            </StyledRoomPlayer>
            <StyledRoomTeam>
                {team &&
                    <span
                        onClick={socket.id === socketId ? onChangeTeam : undefined}
                    >
                        {team}
                    </span>
                }
            </StyledRoomTeam>
        </StyledRoomSlot>
    );
}

export default RoomLobbySlot;