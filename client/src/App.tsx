import React from 'react';
import UserListContainer from './containers/UserListContainer';
import UserProfileContainer from './containers/UserProfileContainer';
import RoomListContainer from './containers/RoomListContainer';

function App() {
  return (
    <>
      <UserListContainer />
      <UserProfileContainer />
      <RoomListContainer/>
    </>
  );
}

export default App;
