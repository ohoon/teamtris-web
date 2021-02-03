import React, { useEffect, useState } from 'react';
import { Game } from '../../../server/src/socket/rooms';
import { Players } from '../../../server/src/socket/users';
import TetrisOthersList from '../components/TetrisOthersList';
import socket from '../socket';

function TetrisOthersContainer() {
    const [players, setPlayers] = useState<Players>([]);

    useEffect(() => {
        socket.on('update game', (game: Game) => {
            const otherPlayers = game.players.filter(player => player.socketId !== socket.id);
            setPlayers(otherPlayers);
        });

        return () => {
            socket.removeListener('update game');
        };
    }, []);

    return (
        <TetrisOthersList
            players={players}
        />
    );
}

export default TetrisOthersContainer;