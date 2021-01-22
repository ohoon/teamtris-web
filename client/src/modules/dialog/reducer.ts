import { createReducer } from 'typesafe-actions';
import { SHOW_DIALOG, HIDE_DIALOG } from './actions';
import { DialogAction, DialogState } from './types';

const initialState = {
    createRoom: false
};

const reducer = createReducer<DialogState, DialogAction>(initialState, {
    [SHOW_DIALOG]: (state, action) => ({
        ...state,
        [action.payload]: true
    }),
    [HIDE_DIALOG]: (state, action) => ({
        ...state,
        [action.payload]: false
    })
});

export default reducer;