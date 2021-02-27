import styled from 'styled-components';

export const StyledUserListWrapper = styled.div`
    height: 100%;
    padding: 8px;
    border-right: 1px solid #D8D8D8;
`;

export const StyledUserListHead = styled.div`
    padding: 6px 16px 6px 16px;
    border: 1px solid #747E87;
    border-radius: 5px;
    background: #727F8C;
    font-weight: bold;
    font-size: 13px;
`;

export const StyledUserListBody = styled.div`
    height: 90%;
    margin: 1% auto;
    padding: 6px;
    overflow-x: hidden;
    overflow-y: scroll;
    font-size: 13px;
`;

export const StyledUserItem = styled.div`
    display: flex;
    align-items: center;
`;