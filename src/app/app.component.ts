import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestService } from './service/rest.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[HttpClient, RestService]
})
export class AppComponent {
  title = 'forum-frontend';
  
}
