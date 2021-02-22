import React, { useEffect } from 'react';
import qs from 'qs';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMeThunk } from '../modules/users';
import { getAccessTokenGoogle } from '../api/auth';

interface GoogleOAuth2Props {
    location: Location;
}

function GoogleOAuth2({ location }: GoogleOAuth2Props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    useEffect(() => {
        (async () => {
            try {
                const result = await getAccessTokenGoogle({ code: query.code!.toString() });
                if (!result.success) {
                    throw result;
                }
    
                const accessToken = result.data;
                localStorage.setItem('ACCESS_TOKEN', accessToken);
                axios.defaults.headers.authorization = `Bearer ${accessToken}`;
                dispatch(getMeThunk());
                history.push('/');
            } catch (err) {
                alert('로그인 실패');
            }
        })();
    });

    return (
        <div>
            로그인중...
        </div>
    );
}

export default GoogleOAuth2;