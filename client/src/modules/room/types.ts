import { ActionType } from 'typesafe-actions';
import { Room } from '../../../../server/src/socket/io';
import * as actions from './actions';

export type RoomState = Room | null;

export type RoomAction = ActionType<typeof actions>;