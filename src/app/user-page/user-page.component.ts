import { Component } from '@angular/core';
import { AppState } from '../reducers';
import { Observable } from 'rxjs';
import { User } from '../model/user/user';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { selectCurrentUser } from '../reducers/user/user.selector';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  user$?: Observable<User>;
  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectCurrentUser);
  }
}
