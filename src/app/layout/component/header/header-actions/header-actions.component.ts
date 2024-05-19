import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { Observable, share } from 'rxjs';
import { User } from '../../../../model/user/user';
import { setCurrentUser } from '../../../../reducers/user/user.actions';
import { AppState } from '../../../../reducers';
import { Router } from '@angular/router';
import {
  selectCurrentUser,
  selectUsers,
} from '../../../../reducers/user/user.selector';

@Component({
  selector: 'app-header-actions',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './header-actions.component.html',
  styleUrl: './header-actions.component.scss',
})
export class HeaderActionsComponent {
  users$?: Observable<Array<User>>;
  currentUser$?: Observable<User>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.users$ = this.store.select(selectUsers);
    this.currentUser$ = this.store.select(selectCurrentUser).pipe(share());
  }

  setUser(user: User): void {
    this.store.dispatch(setCurrentUser({ user }));
  }

  navigateToUserPage(user: User) {
    this.router.navigate(['/user']);
  }
}
