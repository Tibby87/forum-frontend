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
import { loadUsers } from './reducers/user/user.actions';

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
  ],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }
}
