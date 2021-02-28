import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import GoogleOAuth2 from '../components/GoogleOAuth2';

function Auth() {
    return (
        <Switch>
            <Route
            path="/auth/google"
            component={GoogleOAuth2}
            />
            <Route
            render={({ location }) => (
                <div
                style={{ padding: "30px" }}
                >
                <h3>
                    이 페이지는 존재하지 않습니다.
                </h3>
                <p>
                    path={location.pathname}
                </p>
                </div>
            )}
            />
      </Switch>
    );
}

export default memo(Auth);