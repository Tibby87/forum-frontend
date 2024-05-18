import { Component } from '@angular/core';
import { State } from '../reducers';
import { Observable } from 'rxjs';
import { User } from '../model/user/user';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  user$?: Observable<User>;
  constructor(private store: Store<State>, private route: ActivatedRoute) {
    this.user$ = this.store.select((state) => state.user.currentUser);
    console.log(route.snapshot.children);
  }
}
