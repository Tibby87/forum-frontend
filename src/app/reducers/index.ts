import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { userReducer, UserState } from './user/user.reducer';
import { rolesReducer, RolesState } from './roles/roles.reducer';

export interface State {
  user: UserState;
  roles: RolesState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  roles: rolesReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
