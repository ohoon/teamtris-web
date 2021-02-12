import React from 'react';
import styled from 'styled-components';

const RoomLobbySlotBlock = styled.div`
    height: 11.5rem;
    padding: 16px;
    border: 3px solid #E8E8E8;
    border-radius: 16px;
    background: #D3D7DB;
    font-size: 16px;
    text-align: left;

    .profile-image {
        width: 80px;
        height: 80px;
        margin-bottom: 10px;
    }
`;

interface RoomLobbySlotProps {
    socketId: string;
    _id: string;
    username: string;
    nickname: string;
    isReady: boolean;
    isMaster: boolean;
}

function RoomLobbySlot({ socketId, username, nickname, isReady, isMaster }: RoomLobbySlotProps) {
    return (
        <RoomLobbySlotBlock>
            <img
                className="profile-image"
                src="male.png"
                alt="profileImage"
            />
            <strong>
                {isMaster ? "방장" : isReady && "준비 완료"}
            </strong>
            <br />
            <strong>
                {nickname || username}
            </strong>
        </RoomLobbySlotBlock>
    );
}

export default RoomLobbySlot;