import React from 'react';
import styled from 'styled-components';

const RoomItemBlock = styled.div`
    display: flex;
    position: relative;
    padding: 16px;
    border: 3px solid #E8E8E8;
    border-radius: 20px;
    background: #D3D7DB;
    font-size: 16px;
`;

interface RoomItemProps {
    id: number;
    title: string;
    password: string | null;
    current: number;
    max: number;
    mode: string;
    isLock: boolean;
}

function RoomItem({ title, current, max }: RoomItemProps) {
    return (
        <RoomItemBlock>
            {title}
            <br />
            {current} / {max}
        </RoomItemBlock>
    );
}

export default RoomItem;