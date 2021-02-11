import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type DialogState = {
    createRoom: boolean;
    gameResult: boolean;
};

export type DialogAction = ActionType<typeof actions>;