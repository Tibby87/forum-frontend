import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserActivityCount } from '../user-page.component';
import { Role } from '../../model/roles/role';
import { GetUserRightsPipe } from '../../pipe/get-user-rights.pipe';
import { UsersDeniedActivityPipe } from '../../pipe/users-denied-activity.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, GetUserRightsPipe, UsersDeniedActivityPipe],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  @Input() userActivityCount: UserActivityCount;
  @Input() userRole: Role;

  constructor() {}
}
