import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { getMe } from '../../api/users';
import { getMeAsync } from './actions';
import { UsersAction } from './types';

export function getMeThunk(): ThunkAction<Promise<void>, RootState, null, UsersAction> {
    return async (dispatch) => {
        const { request, success, failure } = getMeAsync;
        dispatch(request());
        try {
            const result = await getMe();
            if (!result.success) {
                throw new Error(result.message);
            }

            dispatch(success(result.data));
        } catch (err) {
            dispatch(failure(err));
        }
    }
}