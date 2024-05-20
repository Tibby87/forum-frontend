import { createAction, props } from '@ngrx/store';
import { Role } from '../../model/roles/role';

export enum RolesActionType {
  LOAD_ROLES = '[ROLES] Load Roles',
  SET_ROLES = '[ROLES] Set Roles',
  LOAD_USER_ROLE = '[ROLES] Load user  role',
  SET_USER_ROLE = '[ROLES] Set user role',
}

export const loadRoles = createAction(RolesActionType.LOAD_ROLES);

export const setRoles = createAction(
  RolesActionType.SET_ROLES,
  props<{ roles: Array<Role> }>()
);

export const loadUserRole = createAction(
  RolesActionType.LOAD_USER_ROLE,
  props<{ roleId: number }>()
);

export const setUserRole = createAction(
  RolesActionType.SET_USER_ROLE,
  props<{ userRole: Role }>()
);
