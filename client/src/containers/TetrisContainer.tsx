import React, { useState } from 'react';
import TetrisStage from '../components/TetrisStage';
import { createStage } from '../tetris/stage';

function TetrisContainer() {
    const [stage, setStage] = useState(createStage());

    return (
        <TetrisStage
            stage={stage}
        />
    );
}

export default TetrisContainer;