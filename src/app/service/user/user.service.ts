import { Observable, map } from 'rxjs';
import { RestService } from '../rest/rest.service';
import { User } from '../../model/user/user';
import { Injectable } from '@angular/core';
import { UpdateUserBody } from '../../model/user/update-user-body';
import { ChangePasswordBody } from '../../model/user/change-password-body';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private restService: RestService) {}

  public getUsers(): Observable<Array<User>> {
    return this.restService.get<Array<User>>({ microservice: 'users' });
  }

  public getUserById(userId: number): Observable<User> {
    return this.restService.get<User>({
      microservice: 'user',
      subPath: String(userId),
    });
  }

  public updateUser(userId: number, body: UpdateUserBody): Observable<User> {
    return this.restService.put({
      microservice: 'user',
      subPath: String(userId),
      body,
    });
  }

  public changePassword(
    userId: number,
    body: ChangePasswordBody
  ): Observable<User> {
    return this.restService.put({
      microservice: 'user',
      subPath: String(userId) + '/password',
      body,
    });
  }
}
