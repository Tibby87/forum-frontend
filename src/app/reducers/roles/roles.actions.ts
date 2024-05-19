import { createAction, props } from '@ngrx/store';
import { Role } from '../../model/roles/role';

export enum RolesActionType {
  LOAD_USER_ROLE = '[ROLES] Load user  role',
  SET_USER_ROLE = '[ROLES] Set user role',
}

export const loadUserRole = createAction(
  RolesActionType.LOAD_USER_ROLE,
  props<{ roleId: number }>()
);

export const setUserRole = createAction(
  RolesActionType.SET_USER_ROLE,
  props<{ userRole: Role }>()
);
