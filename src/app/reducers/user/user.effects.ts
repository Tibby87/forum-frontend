import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  UserActionType,
  refetchCurrentUser,
  setCurrentUser,
  setUsers,
} from './user.actions';
import { UserService } from '../../service/user/user.service';
import { filter, map, switchMap, take } from 'rxjs';
import { loadUserRole } from '../roles/roles.actions';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { selectCurrentUser } from './user.selector';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState>
  ) {}

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
      switchMap(() =>
        this.store.select(selectCurrentUser).pipe(
          filter((user) => !!user),
          take(1)
        )
      ),
      switchMap((user) => this.userService.getUserById(user.id)),
      map((user) => setCurrentUser({ user }))
    )
  );
}
