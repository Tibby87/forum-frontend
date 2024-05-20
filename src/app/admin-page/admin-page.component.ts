import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable, Subject, filter, take, takeUntil } from 'rxjs';
import { Role } from '../model/roles/role';
import { selectRoles } from '../reducers/roles/roles.selctor';
import { MatExpansionModule } from '@angular/material/expansion';
import { RoleSelectorComponent } from './role-selector/role-selector.component';
import { RoleEditorFormComponent } from './role-editor-form/role-editor-form.component';
import { UserToRoleEditorComponent } from './user-to-role-editor/user-to-role-editor.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../model/user/user';
import { selectCurrentUser } from '../reducers/user/user.selector';
import { RoleIdEnum } from '../model/roles/role-id';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    RoleSelectorComponent,
    RoleEditorFormComponent,
    UserToRoleEditorComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit, OnDestroy {
  currentUser$: Observable<User>;
  roles$: Observable<Array<Role>>;
  unsubscribe = new Subject<void>();
  selectedRole: Role = null;
  roleIds = RoleIdEnum;

  constructor(private store: Store<AppState>, private router: Router) {
    this.roles$ = this.store.select(selectRoles);
    this.currentUser$ = this.store
      .select(selectCurrentUser)
      .pipe(filter((user) => !!user));
  }

  ngOnInit(): void {
    this.roles$
      .pipe(
        filter((roles) => !!roles),
        take(1)
      )
      .subscribe((roles) => (this.selectedRole = roles[0]));

    this.handleUserChange();
  }

  handleUserChange() {
    this.currentUser$
      .pipe(
        filter((user) => !!user),
        takeUntil(this.unsubscribe)
      )
      .subscribe((user) => {
        if (user.role !== this.roleIds.ADMIN) {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
