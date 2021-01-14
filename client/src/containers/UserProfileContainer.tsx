import React, { useEffect, useState } from 'react';
import { me } from '../api/auth';
import UserProfile from '../components/UserProfile';

function UserProfileContainer() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        (async () => {
            const result = await me();
            setProfile(result.data);
        })();
    }, []);

    return (
        <UserProfile
            profile={profile}
        />
    );
}

export default UserProfileContainer;