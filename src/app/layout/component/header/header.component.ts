import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HeaderActionsComponent } from './header-actions/header-actions.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    HeaderActionsComponent,
    RouterModule,
    MatTooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  currentRoute$: Observable<string>;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.currentRoute$ = this.getCurrentRoute();
  }

  ngOnInit(): void {}

  getCurrentRoute(): Observable<string> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => {
        const ev = event as NavigationEnd;
        return ev.url;
      })
    );
  }
}
