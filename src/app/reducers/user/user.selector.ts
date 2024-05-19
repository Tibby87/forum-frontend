import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

const selectUserFeature = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
  selectUserFeature,
  (state) => state?.users
);

export const selectCurrentUser = createSelector(
  selectUserFeature,
  (state) => state?.currentUser
);

export const selectIsCurrentUser = (userId: number) =>
  createSelector(
    selectCurrentUser,
    (currentUser) => currentUser?.id === userId
  );
