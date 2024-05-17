import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestService } from './service/rest/rest.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from './model/user/user';
import { UserService } from './service/user/user.service';
import { RestHelperService } from './service/rest/rest-helper.service';
import { RolesService } from './service/roles/roles.service';
import { TopicsService } from './service/topics/topics.service';
import { Topic } from './model/topics/topic';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    MatExpansionModule,
    MatCommonModule,
    MatButtonModule,
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
  constructor() {}

  ngOnInit(): void {}
}
