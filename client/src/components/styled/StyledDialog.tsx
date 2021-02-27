import styled from 'styled-components';

export const StyledDialogWrapper = styled.div`
    position: absolute;
    left: 40%;
    top: 25%;
    z-index: 100;
`;

export const StyledDialogBox = styled.div`
    border: 1px solid #D8D8D8;
`;

export const StyledDialogHead = styled.div`
    padding: 3px 12px 3px 12px;
    border: 1px solid #747E87;
    background: #727F8C;
    font-weight: bold;
    font-size: 13px;
`;

export const StyledDialogBody = styled.div`
    width: 400px;
    padding: 32px;
    background: #EEE;
    overflow-y: auto;
    font-size: 14px;
`;