import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable, filter, take } from 'rxjs';
import { Role } from '../model/roles/role';
import { selectRoles } from '../reducers/roles/roles.selctor';
import { MatExpansionModule } from '@angular/material/expansion';
import { RoleSelectorComponent } from './role-selector/role-selector.component';
import { RoleEditorFormComponent } from './role-editor-form/role-editor-form.component';
import { UserToRoleEditorComponent } from './user-to-role-editor/user-to-role-editor.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
export class AdminPageComponent implements OnInit {
  roles$: Observable<Array<Role>>;
  selectedRole: Role = null;
  constructor(private store: Store<AppState>) {
    this.roles$ = this.store.select(selectRoles);
  }

  ngOnInit(): void {
    this.roles$
      .pipe(
        filter((roles) => !!roles),
        take(1)
      )
      .subscribe((roles) => (this.selectedRole = roles[0]));
  }
}
