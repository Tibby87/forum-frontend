import { Component, Input, OnChanges } from '@angular/core';
import { AppState } from '../../reducers';
import { tap } from 'rxjs';
import { User } from '../../model/user/user';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PASSWORD_VALIDATOR } from '../../constant/password-validator';
import { passwordMatchValidator } from '../../validator/password-match-validator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserUpdateFormService } from '../../service/user/user-update-form.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserUpdateFormData } from '../../model/user/user-update-form-data';
import {
  loadUsers,
  refetchCurrentUser,
} from '../../reducers/user/user.actions';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [UserUpdateFormService],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnChanges {
  @Input() user!: User;
  userForm: FormGroup;
  showPassWord = false;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private userUpdateService: UserUpdateFormService,
    private snakckBar: MatSnackBar
  ) {}

  ngOnChanges(): void {
    this.init();
  }

  private init(): void {
    this.buildForm(this.user);
    this.userForm.markAllAsTouched();
  }

  private buildForm(user: User): void {
    this.userForm = this.formBuilder.group({
      name: [user.name, [Validators.minLength(5), Validators.nullValidator]],
      email: [user.email, [Validators.email]],
      password: [user.password, [Validators.pattern(PASSWORD_VALIDATOR)]],
      confirmPassword: [user.password, [passwordMatchValidator]],
    });
  }

  toggleShowPassword() {
    this.showPassWord = !this.showPassWord;
  }

  get updatedName(): string {
    return this.userForm.get('name').value;
  }

  get updatedEmail(): string {
    return this.userForm.get('email').value;
  }

  get updtedPassword(): string {
    return this.userForm.get('password').value;
  }

  get confirmedPassword(): string {
    return this.userForm.get('confirmPassword').value;
  }

  onSubmit() {
    console.log(this.userForm.controls);
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      return;
    }
    if (!this.userForm.dirty) {
      this.handleUndirtyForm();
      return;
    }
    this.userUpdateService.handleEmptyFields(this.userForm);
    this.initUpdate();
  }

  private initUpdate(): void {
    this.userUpdateService
      .updateUserDetails(this.user.id, this.getDataToSubmit(this.user))
      .pipe(
        tap((user) => {
          this.store.dispatch(refetchCurrentUser());
          this.store.dispatch(loadUsers());
        })
      )
      .subscribe();
  }

  private getDataToSubmit(user: User): UserUpdateFormData {
    return {
      ...(this.updatedName !== user.name && { name: this.updatedName }),
      ...(this.updatedEmail !== user.email && { email: this.updatedEmail }),
      ...(this.updtedPassword !== user.password && {
        password1: this.updtedPassword,
      }),
      ...(this.confirmedPassword !== user.password && {
        password2: this.confirmedPassword,
      }),
    };
  }

  private handleUndirtyForm() {
    this.snakckBar.open(
      'No modifications have been made. Modify the fields you want to update.',
      null,
      { verticalPosition: 'top', duration: 10000 }
    );
  }
}
