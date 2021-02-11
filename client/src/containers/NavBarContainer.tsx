import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import { RootState } from '../modules';
import { getMeThunk, initMe } from '../modules/users';
import { hideAllDialog } from '../modules/dialog';
import { setRoom } from '../modules/room'; 
import socket from '../socket';
import NavBar from '../components/NavBar';

function NavBarContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);
    const room = useSelector((state: RootState) => state.room);
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch(getMeThunk());
    }, [dispatch]);

    const redirect = (where: string) => {
        if (room) {
            if (room.isStart) {
                socket.emit('retire game');
                socket.emit('leave room');
                dispatch(setRoom(null));
            }

            socket.emit('leave game');
        }

        dispatch(hideAllDialog());
        history.push(where);
    };
    
    const logout = () => {
        localStorage.removeItem('ACCESS_TOKEN');
        axios.defaults.headers.authorization = null;
        dispatch(initMe());

        if (room) {
            if (room.isStart) {
                socket.emit('retire game');
            }

            socket.emit('leave game');
            socket.emit('leave room');
            dispatch(setRoom(null));
        }

        dispatch(hideAllDialog());
        history.push('/');
    };

    return (
        <NavBar
            me={me}
            redirect={redirect}
            logout={logout}
        />
    );
}

export default NavBarContainer;