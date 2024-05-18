import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { userReducer, UserState } from './user/user.reducer';

export interface State {
  user: UserState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
