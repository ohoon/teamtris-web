import { createAction } from 'typesafe-actions';
import { Room } from '../../../../server/src/socket/io';

export const SET_ROOM = 'room/SET_ROOM';

export const setRoom = createAction(
    SET_ROOM
)<Room>();