import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserPageComponent } from './user-page/user-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: UserPageComponent },
];
