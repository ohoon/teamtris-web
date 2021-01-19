import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { RootState } from '../modules';
import { getMeThunk, initMe } from '../modules/users';

function NavBarContainer() {
    const me = useSelector((state: RootState) => state.users.me.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMeThunk());
    }, [dispatch]);
    
    const logout = () => {
        localStorage.removeItem('ACCESS_TOKEN');
        axios.defaults.headers.authorization = null;
        dispatch(initMe());
    }

    return (
        <NavBar
            me={me}
            logout={logout}
        />
    );
}

export default NavBarContainer;