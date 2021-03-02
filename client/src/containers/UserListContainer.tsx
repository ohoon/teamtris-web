import React, { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import socket from '../socket';
import { ConnectedUser } from '../socket/users';
import UserList from '../components/UserList';

function UserListContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);

    const [users, setUsers] = useState<ConnectedUser>({});

    useEffect(() => {
        const user = me && {
            _id: me._id,
            nickname: me.nickname,
            level: me.level
        };
            
        socket.emit('join channel', user);

        return () => {
            me && socket.emit('leave channel');
        };
    }, [me]);

    useEffect(() => {
        socket.on('update userlist', (users: ConnectedUser) => {
            setUsers(users);
        });

        return () => {
            socket.removeListener('update userlist');
        }
    }, []);

    return (
        <UserList
            users={users}
        />
    );
}

export default memo(UserListContainer);