import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  UserActionType,
  refetchCurrentUser,
  setCurrentUser,
  setUsers,
} from './user.actions';
import { UserService } from '../../service/user/user.service';
import { map, switchMap } from 'rxjs';
import { loadUserRole } from '../roles/roles.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionType.LOAD_USERS),
      switchMap(() => this.userService.getUsers()),
      map((users) => setUsers({ users }))
    )
  );

  setCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionType.SET_CURRENT_USER),
      map((action: ReturnType<typeof setCurrentUser>) =>
        loadUserRole({ roleId: action.user.role })
      )
    )
  );

  refetchCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionType.REFETCH_CURRENT_USER),
      switchMap((action: ReturnType<typeof refetchCurrentUser>) =>
        this.userService.getUserById(action.userId)
      ),
      map((user) => setCurrentUser({ user }))
    )
  );
}
