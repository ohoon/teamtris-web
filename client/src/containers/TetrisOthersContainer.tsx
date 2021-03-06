import React, { useEffect, useState, memo } from 'react';
import { Game } from '../../../src/socket/rooms';
import { Player } from '../../../src/socket/users';
import TetrisOthersList from '../components/TetrisOthersList';
import socket from '../socket';

function TetrisOthersContainer() {
    const [players, setPlayers] = useState<Player>({});

    useEffect(() => {
        socket.on('update game', (game: Game) => {
            const others = {};

            Object.entries(game).forEach(([socketId, player]) => {
                if (socketId !== socket.id) {
                    Object.assign(others, { [socketId]: player });
                }
            });

            setPlayers(others);
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

export default memo(TetrisOthersContainer);