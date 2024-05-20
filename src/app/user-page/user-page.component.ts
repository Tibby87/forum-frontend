import { Component, OnInit } from '@angular/core';
import { AppState } from '../reducers';
import { Observable, filter, take } from 'rxjs';
import { User } from '../model/user/user';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { selectCurrentUser } from '../reducers/user/user.selector';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PASSWORD_VALIDATOR } from '../constant/password-validator';
import { passwordMatchValidator } from '../validator/password-match-validator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  userForm: FormGroup;
  user$?: Observable<User>;
  showPassWord = false;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.user$ = this.store.select(selectCurrentUser);
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.user$
      .pipe(
        filter((user) => !!user),
        take(1)
      )
      .subscribe((user) => {
        this.userForm = this.formBuilder.group({
          name: [user.name, [Validators.minLength(5)]],
          email: [user.email, [Validators.email]],
          passwordGroup: this.formBuilder.group(
            {
              password: [
                user.password,
                [Validators.pattern(PASSWORD_VALIDATOR)],
              ],
              confirmPassword: [
                user.password,
                [Validators.pattern(PASSWORD_VALIDATOR)],
              ],
            },
            { validators: [passwordMatchValidator] }
          ),
        });
      });
  }

  handleChange() {
    console.log(this.userForm.errors);
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

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    console.log(this.userForm);
  }
}
