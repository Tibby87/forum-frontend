import { Action, createAction, props } from '@ngrx/store';
import { User } from '../../model/user/user';

export enum UserActionType {
  LOAD_USERS = '[USER] Load users',
  SET_USERS = '[USER] Set users',
  SET_CURRENT_USER = '[USER] Set current user',
  REFETCH_CURRENT_USER = '[USER] Refetch current user',
}

export const loadUsers = createAction(UserActionType.LOAD_USERS);

export const refetchCurrentUser = createAction(
  UserActionType.REFETCH_CURRENT_USER,
  props<{ userId: number }>()
);

export const setUsers = createAction(
  UserActionType.SET_USERS,
  props<{ users: User[] }>()
);
export const setCurrentUser = createAction(
  UserActionType.SET_CURRENT_USER,
  props<{ user: User }>()
);
