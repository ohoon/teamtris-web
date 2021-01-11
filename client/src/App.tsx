import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route
        path="/"
        exact
        component={Home}
      />
      <Route
        path="/login"
        component={Login}
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

export default App;
