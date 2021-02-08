import { ActionType } from 'typesafe-actions';
import { CurrentRoom } from '../../socket/rooms';
import * as actions from './actions';

export type RoomState = CurrentRoom | null;

export type RoomAction = ActionType<typeof actions>;