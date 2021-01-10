import React from 'react';
import UserListContainer from './containers/UserListContainer';
import UserProfileContainer from './containers/UserProfileContainer';
import RoomListContainer from './containers/RoomListContainer';
import ChatsContainer from './containers/ChatsContainer';

function App() {
  return (
    <>
      <UserListContainer />
      <UserProfileContainer />
      <RoomListContainer />
      <ChatsContainer />
    </>
  );
}

export default App;
