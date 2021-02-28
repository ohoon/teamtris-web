import styled from 'styled-components';
import { TEAM } from '../../socket/rooms';

export const StyledRoomWrapper = styled.div`
    height: 100%;
    padding: 8px;
`;

export const StyledRoomHead = styled.div`
    display: flex;
    padding: 6px 16px 6px 16px;
    border: 1px solid #747E87;
    border-radius: 5px;
    background: #727F8C;
    font-weight: bold;
    font-size: 13px;
`;

export const StyledRoomHeadRight = styled.div`
    margin-left: auto;
`;

export const StyledRoomBody = styled.div`
    height: 400px;
    margin: 1% auto;
    padding: 8px;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 13px;
`;

export const StyledRoomMenu = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: auto;
`;

export const StyledRoomItemWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 4px;
    padding: 16px 20px 16px 20px;
    border: 1px solid #D8D8D8;
    border-radius: 16px;
    background: #D5D9DE;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: #E0E4E8;
    }
`;

export const StyledRoomItemRoomId = styled.div`
    font-size: 25px;
    font-weight: bold;
    padding-right: 4%;
    border-right: 1px solid #747E87;
`;

export const StyledRoomItemPeople = styled.div`
    position: absolute;
    right: 6%;
    top: 15%;
    font-size: 13px;
`;

export const StyledRoomItemRoomInfo = styled.div`
    padding-left: 4%;
    border-left: 1px soild;
`;

export const StyledRoomItemTitle = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
`;

export const StyledRoomItemMode = styled.div`
    font-size: 14px;
`;

export const StyledRoomItemStatus = styled.div`
    position: absolute;
    right: 6%;
    bottom: 15%;
    font-weight: bold;
    font-size: 13px;
`;

export const StyledRoomSlot = styled.div<{ team?: string }>`
    height: 11.5rem;
    border: 1px solid #D8D8D8;
    border-radius: 16px;
    margin: 4px;
    padding: 16px;
    background: ${props => props.team ? TEAM[props.team].color : '#D5D9DE'};
    font-size: 16px;
    text-align: left;
`;

export const StyledRoomEmptySlot = styled.div`
    height: 11.5rem;
    border: 1px solid #D8D8D8;
    border-radius: 16px;
    margin: 4px;
    background: #D5D9DE;
`;

export const StyledRoomPlayer = styled.div`
    display: flex;
    position: relative;
    left: 5%;
    top: 3%;
    font-weight: bold;
`;

export const StyledRoomPlayerStatus = styled.div`
    position: absolute;
    right: 10%;
    top: 10%;
    font-weight: bold;
`;

export const StyledRoomTeam = styled.div`
    position: absolute;
    right: 10%;
    bottom: 10%;
    font-weight: bold;
    cursor: pointer;
`;