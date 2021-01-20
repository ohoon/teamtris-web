import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type DialogState = {
    roomCreate: boolean;
};

export type DialogAction = ActionType<typeof actions>;