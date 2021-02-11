import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { RootState } from '../modules';
import { getMeThunk, initMe } from '../modules/users';
import { setRoom } from '../modules/room'; 
import socket from '../socket';
import NavBar from '../components/NavBar';

function NavBarContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMeThunk());
    }, [dispatch]);

    const leaveRoom = () => {
        socket.emit('retire game');
        socket.emit('leave room');
        dispatch(setRoom(null));
    };
    
    const logout = () => {
        localStorage.removeItem('ACCESS_TOKEN');
        axios.defaults.headers.authorization = null;
        dispatch(initMe());
        leaveRoom();
    };

    return (
        <NavBar
            me={me}
            leaveRoom={leaveRoom}
            logout={logout}
        />
    );
}

export default NavBarContainer;