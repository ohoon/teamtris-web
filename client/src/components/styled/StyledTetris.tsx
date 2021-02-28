import styled, { css } from 'styled-components';
import { TEAM } from '../../socket/rooms';
import { STAGE_WIDTH, STAGE_HEIGHT } from '../../tetris/stage';

export const StyledTetrisStage = styled.div<{ size: number }>`
    display: grid;
    grid-template-rows: repeat(
        ${STAGE_HEIGHT},
        calc(${props => props.size}vw / ${STAGE_WIDTH})
    );
    grid-template-columns: repeat(
        ${STAGE_WIDTH},
        1fr
    );
    grid-gap: 1px;
    position: relative;
    width: 100%;
    max-width: ${props => props.size}vw;
    margin: auto;
    background: #111;
`;

export const StyledTetrisCell = styled.div<{ type: number | string, color: string, outline?: boolean }>`
    width: auto;
    ${props => props.outline ?
        css`
        background: rgba(${props.color}, 0.2);
        border: ${props.type === 0 ? '0px solid' : '4px solid'};
        border-bottom-color: rgba(${props.color}, 0.015);
        border-right-color: rgba(${props.color}, 0.10);
        border-top-color: rgba(${props.color}, 0.10);
        border-left-color: rgba(${props.color}, 0.05);
        ` :
        css`
        background: rgba(${props.color}, 0.8);
        border: ${props.type === 0 ? '0px solid' : '4px solid'};
        border-bottom-color: rgba(${props.color}, 0.1);
        border-right-color: rgba(${props.color}, 1);
        border-top-color: rgba(${props.color}, 1);
        border-left-color: rgba(${props.color}, 0.3);
        `
    }
`;

export const StyledTetirsOthers = styled.div`
    min-height: 37vw;
    padding: 2%;
`;

export const StyledTetrisOthersItem = styled.div<{ team?: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5%;
    ${props => props.team && `background: ${TEAM[props.team].color}`}
`;

export const StyledTetrisOverlay = styled.div<{ size: number }>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: ${props => props.size}vw;
    color: #AA2222;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`;

export const StyledTetrisGarbageBar = styled.div`
    width: 2vw;
    display: grid;
    grid-template-rows: repeat(
        10,
        2vw
    );
    grid-template-columns: repeat(
        1,
        2vw
    );
    grid-gap: 1px;
    margin: 50% auto;
    background: #111;
`;

export const StyledTetrisHelp = styled.div`
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15%;
    border: 5px solid #343A40;
    border-radius: 10px;
    font-size: 15px;
`;

export const StyledTetrisHold = styled.div`
    width: 6vw;
    height: 6vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111;
`;

export const StyledTetrisNext = styled.div`
    width: 6vw;
    height: 18vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #111;
`;

export const StyledTetromino = styled.div<{ width: number, height: number }>`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(6vw / 5)
    );
    grid-template-columns: repeat(
        ${props => props.width},
        calc(6vw / 5)
    );
    grid-gap: 1px;
    margin: auto;
`;

export const StyledTetrisStatus = styled.div`
    margin-top: 10%;
    padding-top: 10%;
    padding-left: 15%;
    border: 5px solid #343A40;
    border-radius: 10px;
    font-size: 14px;
`;