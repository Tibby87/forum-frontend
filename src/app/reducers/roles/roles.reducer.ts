import { createReducer, on } from '@ngrx/store';
import { Role } from '../../model/roles/role';
import { setRoles } from './roles.actions';

export interface RolesState {
  roles: Array<Role>;
}

const initialState: RolesState = {
  roles: null,
};

export const rolesReducer = createReducer<RolesState>(
  initialState,
  on(setRoles, (state, action) => ({ ...state, roles: action.roles }))
);
