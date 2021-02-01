import React, { useState } from 'react';
import { Players } from '../../../server/src/socket/users';
import TetrisOthersList from '../components/TetrisOthersList';

function TetrisOthersContainer() {
    const [players, setPlayers] = useState<Players>([]);

    return (
        <TetrisOthersList
            players={players}
        />
    );
}

export default TetrisOthersContainer;