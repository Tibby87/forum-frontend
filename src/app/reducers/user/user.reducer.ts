import { createReducer, on } from '@ngrx/store';
import { User } from '../../model/user/user';
import { setCurrentUser, setUsers } from './user.actions';

export interface UserState {
  users: Array<User>;
  currentUser: User;
}

const initialState: UserState = {
  users: undefined,
  currentUser: null,
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(setUsers, (state, action) => ({
    ...state,
    users: action.users,
  })),
  on(setCurrentUser, (state, action) => ({
    ...state,
    currentUser: action.user,
  }))
);
