import { combineReducers } from 'redux';
import users from './users';
import room from './room';
import dialog from './dialog';

const rootReducer = combineReducers({
    users,
    room,
    dialog
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;