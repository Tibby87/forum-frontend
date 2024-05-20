import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestService } from './service/rest/rest.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user/user.service';
import { RestHelperService } from './service/rest/rest-helper.service';
import { RolesService } from './service/roles/roles.service';
import { TopicsService } from './service/topics/topics.service';
import { MatCommonModule } from '@angular/material/core';
import { LayoutComponent } from './layout/layout.component';
import { Store } from '@ngrx/store';
import { loadUsers, setCurrentUser } from './reducers/user/user.actions';
import { RolesHelperService } from './service/roles/roles-helper.service';
import { loadRoles } from './reducers/roles/roles.actions';
import { selectUsers } from './reducers/user/user.selector';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    MatCommonModule,
    LayoutComponent,
  ],
  providers: [
    HttpClient,
    RestHelperService,
    RestService,
    UserService,
    RolesService,
    TopicsService,
    RolesHelperService,
  ],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadRoles());
    this.store
      .select(selectUsers)
      .pipe(
        filter((users) => !!users),
        take(1)
      )
      .subscribe((users) =>
        this.store.dispatch(setCurrentUser({ user: users[0] }))
      );
  }
}
