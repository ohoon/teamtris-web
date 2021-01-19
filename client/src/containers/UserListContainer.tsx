import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserList from '../components/UserList';
import { RootState } from '../modules';
import socket from '../socket';
import { ConnectedUsers } from '../socket/users';

function UserListContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);

    const [users, setUsers] = useState<ConnectedUsers>([]);

    useEffect(() => {
        const user = me && {
            socketId: socket.id,
            id: me.id,
            username: me.username,
            nickname: me.nickname
        };
            
        socket.emit('join channel', user);

        return () => {
            me && socket.emit('leave channel', socket.id);
        };
    }, [me]);

    useEffect(() => {
        socket.on('update userlist', (users: ConnectedUsers) => {
            setUsers(users);
        });
        window.addEventListener('beforeunload', () => socket.emit('leave channel', socket.id));

        return () => {
            socket.removeListener('update userlist');
            window.removeEventListener('beforeunload', () => socket.emit('leave channel', socket.id));
        }
    }, []);

    return (
        <UserList
            users={users}
        />
    );
}

export default UserListContainer;