import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RolesState } from './roles.reducer';
import { RolesHelperService } from '../../service/roles/roles-helper.service';
import { RightNamesEnum } from '../../model/roles/right-name';

export const selectRolesState = createFeatureSelector<RolesState>('roles');

export const selectUserRole = createSelector(
  selectRolesState,
  (state) => state?.userRole
);

export const selectUserRights = createSelector(selectUserRole, (userRole) =>
  RolesHelperService.getUserRightArray(userRole?.rights)
);

export const selectUserHasRight = (rightName: RightNamesEnum) =>
  createSelector(selectUserRights, (userRights) =>
    userRights?.includes(rightName)
  );

export const selectUsersDeniedActions = createSelector(
  selectUserRole,
  (userRole) => RolesHelperService.getUsersDeniedActions(userRole?.rights)
);
