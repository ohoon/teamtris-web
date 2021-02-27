import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const StyledButton = styled(Button)`
    & + & {
        margin-left: 2px;
    }
`;

export const StyledSubmitButton = styled(Button)`
    margin: 16px auto;
    margin-bottom: 0;
`;

export const StyledCornerButton = styled(Button)`
    position: absolute;
    right: 6%;
    top: 10%;
`;

export const StyledKickButton = styled.div`
    margin-left: 3%;
    cursor: pointer;

    &:hover {
        color: rgba(0, 0, 0, 0.5);
    }
`;

export const StyledCloseButton = styled.div`
    width: 12px;
    height: 12px;
    margin-top: 3px;
    float: right;
    border: 1px solid #747E87;
    border-radius: 50%;
    background: #EE5555;

    &:hover {
        background: #FF7777;
    }
`;