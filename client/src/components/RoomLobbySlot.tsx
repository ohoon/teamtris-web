import React from 'react';
import styled from 'styled-components';
import { BsX } from 'react-icons/bs';
import socket from '../socket';
import { TEAM } from '../socket/rooms';

const RoomLobbySlotBlock = styled.div<{ team?: string }>`
    height: 11.5rem;
    border: 1px solid #D8D8D8;
    border-radius: 16px;
    margin: 4px;
    padding: 16px;
    background: ${props => props.team ? TEAM[props.team].color : '#D5D9DE'};
    font-size: 16px;
    text-align: left;

    .profile-image {
        width: 80px;
        height: 80px;
        border: 0px;
        border-radius: 15%;
        margin: 3%;
    }
`;

const PlayerStatusBlock = styled.div`
    position: absolute;
    right: 10%;
    top: 10%;
    font-weight: bold;
`;

const PlayerBlock = styled.div`
    display: flex;
    position: relative;
    left: 5%;
    top: 3%;
    font-weight: bold;
`;

const KickButton = styled.div`
    margin-left: 3%;
    cursor: pointer;

    &:hover {
        color: rgba(0, 0, 0, 0.5);
    }
`;

const TeamBlock = styled.div`
    position: absolute;
    right: 5%;
    bottom: 3%;
    font-weight: bold;
`;

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
        <RoomLobbySlotBlock
            team={team}
        >
            <img
                className="profile-image"
                src={profileImage}
                alt="profileImage"
            />
            <PlayerStatusBlock>
                {isMaster ? "방장" : isReady && "준비 완료"}
            </PlayerStatusBlock>
            <PlayerBlock>
                {nickname}
                {onKickPlayer && !isMaster && socket.id !== socketId ?            
                    <KickButton
                        onClick={() => onKickPlayer(socketId)}
                    >
                        <BsX />
                    </KickButton> :
                    null
                }
            </PlayerBlock>
            <TeamBlock>
                {team &&
                    <span
                        onClick={socket.id === socketId ? onChangeTeam : undefined}
                    >
                        {team}
                    </span>
                }
            </TeamBlock>
        </RoomLobbySlotBlock>
    );
}

export default RoomLobbySlot;