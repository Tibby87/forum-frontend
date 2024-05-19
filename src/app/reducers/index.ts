import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { userReducer, UserState } from './user/user.reducer';
import { rolesReducer, RolesState } from './roles/roles.reducer';

export interface AppState {
  user: UserState;
  roles: RolesState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  roles: rolesReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
