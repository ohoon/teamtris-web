import io from 'socket.io-client';

const socket = io('https://teamtris-server.herokuapp.com');

export default socket;