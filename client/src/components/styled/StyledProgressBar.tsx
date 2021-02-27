import styled from 'styled-components';
import { ProgressBar } from 'react-bootstrap';

export const StyledProgressBar = styled(ProgressBar)`
    height: 15%;
    position: relative;
    border: 1px solid #CCC;
    border-radius: 6px;
    background: #F6F6F6;
`;

export const StyledProgressBarLabel = styled.div`
    position: relative;
    bottom: 14%;
    text-align: center;
`;