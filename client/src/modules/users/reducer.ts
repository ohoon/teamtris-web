import { createReducer } from 'typesafe-actions';
import { GET_ME, GET_ME_ERROR, GET_ME_SUCCESS } from './actions';
import { UsersState, UsersAction } from './types';

const initialState = {
    me: {
        loading: false,
        data: null,
        error: null
    }
};

const reducer = createReducer<UsersState, UsersAction>(initialState, {
    [GET_ME]: (state) => ({
        ...state,
        me: {
            loading: true,
            data: null,
            error: null
        }
    }),
    [GET_ME_SUCCESS]: (state, action) => ({
        ...state,
        me: {
            loading: false,
            data: action.payload,
            error: null
        }
    }),
    [GET_ME_ERROR]: (state, action) => ({
        ...state,
        me: {
            loading: false,
            data: null,
            error: action.payload
        }
    })
});

export default reducer;