import { createReducer, on } from '@ngrx/store';
import { Role } from '../../model/roles/role';
import { setRoles, setUserRole } from './roles.actions';

export interface RolesState {
  roles: Array<Role>;
  userRole: Role;
}

const initialState: RolesState = {
  userRole: null,
  roles: null,
};

export const rolesReducer = createReducer<RolesState>(
  initialState,
  on(setRoles, (state, action) => ({ ...state, roles: action.roles })),
  on(setUserRole, (state, action) => ({ ...state, userRole: action.userRole }))
);
