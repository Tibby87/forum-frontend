import { createReducer, on } from '@ngrx/store';
import { Role } from '../../model/roles/role';
import { setUserRole } from './roles.actions';

export interface RolesState {
  userRole: Role;
}

const initialState: RolesState = {
  userRole: null,
};

export const rolesReducer = createReducer<RolesState>(
  initialState,
  on(setUserRole, (state, action) => ({ ...state, userRole: action.userRole }))
);
