import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios'
import { Me } from '../../api/users';

export const GET_ME = 'users/GET_ME';
export const GET_ME_SUCCESS = 'users/GET_ME_SUCCESS';
export const GET_ME_ERROR = 'users/GET_ME_ERROR';

export const getMeAsync = createAsyncAction(
    GET_ME,
    GET_ME_SUCCESS,
    GET_ME_ERROR
)<void, Me, AxiosError>();
