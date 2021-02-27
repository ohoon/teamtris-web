import styled from 'styled-components';

export const StyledMyProfileWrapper = styled.div`
    height: 100%;
    padding: 24px 8px 24px 8px;
    border-top: 1px solid #D8D8D8;
    border-right: 1px solid #D8D8D8;
`;

export const StyledMyProfileWrapperNotLoggedIn = styled.div`
    height: 100%;
    padding: 32px;
    border-top: 1px solid #D8D8D8;
    border-right: 1px solid #D8D8D8;
    text-align: center;
`;

export const StyledMyProfile = styled.div`
    display: flex;
    margin-bottom: 1.5rem;
`;

export const StyledProfileImage = styled.img`
    width: 96px;
    height: 96px;
    border-radius: 15%;
    padding: 3%;
`;

export const StyledMyInfo = styled.div`
    width: 100%;
    padding: 2%;
`;

export const StyledUserName = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5%;
    font-weight: bold;
    font-size: 16px;
`;