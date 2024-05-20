import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Role } from '../../model/roles/role';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { GetUserRightsPipe } from '../../pipe/get-user-rights.pipe';
import { RolesService } from '../../service/roles/roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { loadRoles } from '../../reducers/roles/roles.actions';

@Component({
  selector: 'app-role-editor-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    GetUserRightsPipe,
  ],
  templateUrl: './role-editor-form.component.html',
  styleUrl: './role-editor-form.component.scss',
})
export class RoleEditorFormComponent implements OnChanges {
  roleForm: FormGroup;
  @Input() selectedRole: Role;
  rights = [1, 3, 7, 15];
  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  ngOnChanges(): void {
    if (!!this.selectedRole) {
      this.buildForm();
    }
  }

  buildForm() {
    this.roleForm = this.formBuilder.group({
      roleName: [this.selectedRole.name, [Validators.required]],
      rights: [this.selectedRole.rights],
    });
  }

  onSubmit(): void {
    this.roleForm.markAllAsTouched();
    if (this.roleForm.invalid) return;
    if (!this.roleForm.dirty) {
      this.snackBar.open("You haven't made any modifications.", null, {
        verticalPosition: 'top',
        duration: 50000,
      });
      return;
    }
    this.rolesService
      .updateRole(this.selectedRole.id, {
        name: this.roleForm.get('roleName').value,
        rights: Number(this.roleForm.get('rights').value),
      })
      .pipe(
        tap(() => {
          this.snackBar.open('Role has been modified successfully.', null, {
            verticalPosition: 'top',
            duration: 50000,
          }),
            this.store.dispatch(loadRoles());
        })
      )
      .subscribe();
  }
}
