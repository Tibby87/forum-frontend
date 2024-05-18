import { createAction, props } from '@ngrx/store';
import { Role } from '../../model/roles/role';

export enum RolesActionType {
  LOAD_ROLES = '[ROLES] Load roles',
  SET_ROLES = '[ROLES] Set roles',
}

export const loadRoles = createAction(RolesActionType.LOAD_ROLES);

export const setRoles = createAction(
  RolesActionType.SET_ROLES,
  props<{ roles: Array<Role> }>()
);
