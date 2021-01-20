import { combineReducers } from 'redux';
import users from './users';
import dialog from './dialog';

const rootReducer = combineReducers({
    users,
    dialog
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;