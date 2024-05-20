import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  RolesActionType,
  loadUserRole,
  setRoles,
  setUserRole,
} from './roles.actions';
import { map, of, switchMap } from 'rxjs';
import { RolesService } from '../../service/roles/roles.service';
@Injectable()
export class RolesEffects {
  constructor(private actions$: Actions, private rolesService: RolesService) {}

  loadUserRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActionType.LOAD_USER_ROLE),
      switchMap((action: ReturnType<typeof loadUserRole>) =>
        this.rolesService.getRoleById(action.roleId)
      ),
      map((role) => setUserRole({ userRole: role }))
    )
  );

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActionType.LOAD_ROLES),
      switchMap(() => this.rolesService.getRoles()),
      map((roles) => setRoles({ roles }))
    )
  );
}
