import io from 'socket.io-client';

const socket = io('https://teamtris.herokuapp.com');

export default socket;