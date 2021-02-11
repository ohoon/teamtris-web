import { createAction } from 'typesafe-actions';
import { CurrentRoom } from '../../socket/rooms';

export const SET_ROOM = 'room/SET_ROOM';

export const START_GAME = 'room/START_GAME';

export const setRoom = createAction(
    SET_ROOM
)<CurrentRoom | null>();