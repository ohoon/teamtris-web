import { ActionType } from 'typesafe-actions';
import { Me } from '../../api/users';
import * as actions from './actions';

export type UsersState = {
    me: {
        loading: boolean;
        data: Me | null;
        error: Error | null;
    }
};

export type UsersAction = ActionType<typeof actions>;