import React, { memo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const HelpBlock = styled.div`
    padding: 15%;
    border: 5px solid #343A40;
    border-radius: 10px;
    font-size: 15px;
`;

function TetrisHelp() {
    return (
        <Wrapper>
            <HelpBlock>
                <p>
                    <small>
                        &lt;
                    </small>
                        ←
                    <small>
                        &gt;
                        <br />
                        Move Left
                    </small>
                </p>
                <p>
                    <small>
                        &lt;
                    </small>
                        →
                    <small>
                        &gt;
                        <br />
                        Move Right
                    </small>
                </p>
                <p>
                    <small>
                        &lt;    
                    </small>
                        ↑
                    <small>
                        &gt;
                        <br />
                        Rotate
                    </small>
                </p>
                <p>
                    <small>
                        &lt;
                    </small>
                        ↓
                    <small>
                        &gt;
                        <br />
                        Soft Drop
                    </small>
                </p>
                <p>
                    <small>
                        &lt;
                    </small>
                        Space
                    <small>
                        &gt;
                        <br />
                        Hard Drop
                    </small>
                </p>
                <p>
                    <small>
                        &lt;
                    </small>
                        Shift
                    <small>
                        &gt;
                        <br />
                        Hold
                    </small>
                </p>
            </HelpBlock>
        </Wrapper>
    );
}

export default memo(TetrisHelp);