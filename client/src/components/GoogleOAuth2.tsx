import React, { useEffect } from 'react';
import qs from 'qs';
import { getAccessTokenGoogle } from '../api/auth';

interface GoogleOAuth2Props {
    location: Location;
}

function GoogleOAuth2({ location }: GoogleOAuth2Props) {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    useEffect(() => {
        getAccessTokenGoogle({ code: query.code!.toString() });
    });

    return null;
}

export default GoogleOAuth2;