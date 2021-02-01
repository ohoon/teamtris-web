import { createReducer } from 'typesafe-actions';
import { SET_ROOM, START_GAME } from './actions';
import { RoomAction, RoomState } from './types';

const initialState = null;

const reducer = createReducer<RoomState, RoomAction>(initialState, {
    [SET_ROOM]: (state, action) => (
        action.payload
    ),
    [START_GAME]: (state): RoomState => ({
        ...state!,
        isStart: true
    })
});

export default reducer;