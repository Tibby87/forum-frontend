import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RolesActionType, setRoles } from './roles.actions';
import { map, switchMap } from 'rxjs';
import { RolesService } from '../../service/roles/roles.service';

@Injectable()
export class RolesEffects {
  constructor(private actions: Actions, private rolesService: RolesService) {}
  loadUsers$ = createEffect(() =>
    this.actions.pipe(
      ofType(RolesActionType.LOAD_ROLES),
      switchMap(() => this.rolesService.getRoles()),
      map((roles) => setRoles({ roles }))
    )
  );
}
