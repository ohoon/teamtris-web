import React, { useEffect, useState } from 'react';
import { Player, Players } from '../../../server/src/socket/users';
import TetrisOthersList from '../components/TetrisOthersList';
import socket from '../socket';

function TetrisOthersContainer() {
    const [players, setPlayers] = useState<Players>([]);

    useEffect(() => {
        socket.on('other player is loaded', (player: Player) => {
            setPlayers(players => players.concat(player));
        });

        return () => {
            socket.removeListener('other player is loaded');
        };
    }, []);

    return (
        <TetrisOthersList
            players={players}
        />
    );
}

export default TetrisOthersContainer;