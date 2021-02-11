import { createAction } from 'typesafe-actions';

export const SHOW_DIALOG = 'dialog/SHOW_DIALOG';
export const HIDE_DIALOG = 'dialog/HIDE_DIALOG';
export const HIDE_ALL_DIALOG = 'dialog/HIDE_ALL_DIALOG';

export const showDialog = createAction(
    SHOW_DIALOG
)<string>();

export const hideDialog = createAction(
    HIDE_DIALOG
)<string>();

export const hideAllDialog = createAction(
    HIDE_ALL_DIALOG
)<void>();