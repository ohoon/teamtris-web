import { createReducer } from 'typesafe-actions';
import { SET_ROOM } from './actions';
import { RoomAction, RoomState } from './types';

const initialState = null;

const reducer = createReducer<RoomState, RoomAction>(initialState, {
    [SET_ROOM]: (state, action) => (
        action.payload
    )
});

export default reducer;