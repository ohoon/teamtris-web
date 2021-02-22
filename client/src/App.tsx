import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dialog from './pages/partial/Dialog';
import Navigation from './pages/partial/Navigation';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Login from './pages/Login';
import Practice from './pages/Practice';
import Game from './pages/Game';

function App() {
  return (
    <>
      <Dialog />
      <Navigation />
      <Switch>
        <Route
          path="/"
          exact
          component={Home}
        />
        <Route
          path="/auth"
          component={Auth}
        />
        <Route
          path="/login"
          component={Login}
        />
        <Route
          path="/practice"
          component={Practice}
        />
        <Route
          path="/game"
          component={Game}
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
    </>
  );
}

export default App;
