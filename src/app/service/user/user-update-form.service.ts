import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { UpdateUserBody } from '../../model/user/update-user-body';
import {
  Observable,
  concatMap,
  exhaustMap,
  forkJoin,
  map,
  of,
  tap,
} from 'rxjs';
import { UserUpdateFormData } from '../../model/user/user-update-form-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../model/user/user';
import { FormGroup } from '@angular/forms';

@Injectable()
export class UserUpdateFormService {
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  public updateUserDetails(
    userId: number,
    data: UserUpdateFormData
  ): Observable<User> {
    const observables: Observable<User>[] = [];
    this.getNameAndEmailUpdateRequest(userId, data, observables);
    this.getPassWordUpdateRequest(userId, data, observables);
    if (!observables.length) {
      this.snackBar.open(
        'All details are the same. Make sure that you modify the fields you want to update.',
        null,
        { verticalPosition: 'top', duration: 10000 }
      );
    }
    return forkJoin(observables).pipe(concatMap((result) => result));
  }

  handleEmptyFields(formGroup: FormGroup): void {
    Object.entries(formGroup.controls).forEach(([field, control]) => {
      if (!control.value) {
        this.snackBar.open(
          'Empty fields wont be updated. Please make sure to provide a value for every field you want to update',
          null,
          { verticalPosition: 'top', duration: 10000, politeness: 'assertive' }
        );
      }
    });
  }

  private getPassWordUpdateRequest(
    userId: number,
    data: UserUpdateFormData,
    obsArray: Observable<User>[]
  ) {
    if (!!data['password1'] && !!data['password2']) {
      obsArray.push(
        this.userService
          .changePassword(userId, {
            password1: data.password1,
            password2: data.password2,
          })
          .pipe(
            tap(() =>
              this.snackBar.open('Password successfully updated.', null, {
                verticalPosition: 'top',
                duration: 10000,
              })
            )
          )
      );
    }
  }

  private getNameAndEmailUpdateRequest(
    userId: number,
    data: UserUpdateFormData,
    obsArray: Observable<User>[]
  ) {
    if (!!data['email'] || !!data['name']) {
      const requestBody: UpdateUserBody = {
        ...(!!data['name'] && { name: data['name'] }),
        ...(!!data['email'] && { email: data['email'] }),
      };
      obsArray.push(
        this.userService.updateUser(userId, requestBody).pipe(
          tap(() =>
            this.snackBar.open('User successfully updated.', null, {
              verticalPosition: 'top',
              duration: 10000,
            })
          )
        )
      );
    }
  }
}
