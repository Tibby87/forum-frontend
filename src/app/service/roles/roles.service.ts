import { Observable } from 'rxjs';
import { RestService } from '../rest/rest.service';
import { Role } from '../../model/roles/role';
import { User } from '../../model/user/user';
import { Injectable } from '@angular/core';

// - GET /api/roles
// - GET /api/role/:id
// - PUT /api/role/:id
// - GET /api/role/:id/users
@Injectable({ providedIn: 'root' })
export class RolesService {
  constructor(private restService: RestService) {}

  public getRoles(): Observable<Array<Role>> {
    return this.restService.get<Array<Role>>({ microservice: 'roles' });
  }

  public getRoleById(roleId: number): Observable<Role> {
    return this.restService.get<Role>({
      microservice: 'role',
      subPath: String(roleId),
    });
  }

  public updateRole(roleId: number, body: Partial<Role>): Observable<Role> {
    return this.restService.put<Role>({
      microservice: 'role',
      subPath: String(roleId),
      body,
    });
  }

  public getUsersByRoleId(roleId: number): Observable<Array<User>> {
    return this.restService.get<Array<User>>({
      microservice: 'role',
      subPath: `${roleId}/users`,
    });
  }
}
