import React from 'react';
import styled from 'styled-components';
import socket from '../socket';
import { TEAM } from '../socket/rooms';

const RoomLobbySlotBlock = styled.div<{ team?: string }>`
    height: 11.5rem;
    padding: 16px;
    border: 3px solid #E8E8E8;
    border-radius: 16px;
    background: ${props => props.team ? TEAM[props.team].color : '#D3D7DB'};
    font-size: 16px;
    text-align: left;

    .profile-image {
        width: 80px;
        height: 80px;
        border: 0px;
        border-radius: 15%;
        padding: 3%;
        margin-bottom: 10px;
    }
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
            <strong>
                {isMaster ? "방장" : isReady && "준비 완료"}
            </strong>
            {onKickPlayer && !isMaster && socket.id !== socketId ?            
                <span
                    onClick={() => onKickPlayer(socketId)}
                >
                    x
                </span> :
                null
            }
            <br />
            <strong>
                {nickname}
            </strong>
            {team &&
                <span
                    onClick={socket.id === socketId ? onChangeTeam : undefined}
                >
                    {team}
                </span>
            }
        </RoomLobbySlotBlock>
    );
}

export default RoomLobbySlot;