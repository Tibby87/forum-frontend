import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActionType, setCurrentUser, setUsers } from './user.actions';
import { UserService } from '../../service/user/user.service';
import { exhaustMap, map, switchMap } from 'rxjs';
import { loadUserRole } from '../roles/roles.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionType.LOAD_USERS),
      switchMap(() => this.userService.getUsers()),
      switchMap((users) => [
        setUsers({ users }),
        setCurrentUser({ user: users[0] }),
      ])
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
}
