import React, { memo } from 'react';
import { StyledTetrisHelp } from './styled/StyledTetris';

function TetrisHelp() {
    return (
        <StyledTetrisHelp>
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
        </StyledTetrisHelp>
    );
}

export default memo(TetrisHelp);