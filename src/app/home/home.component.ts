import { Component } from '@angular/core';
import { Observable, share, switchMap, take } from 'rxjs';
import { Topic } from '../model/topics/topic';
import { TopicsService } from '../service/topics/topics.service';
import { TopicListComponent } from './topic-list/topic-list.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { User } from '../model/user/user';
import { selectCurrentUser } from '../reducers/user/user.selector';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopicListComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  topics!: Array<Topic>;
  currentUser$?: Observable<User>;

  constructor(
    private topicService: TopicsService,
    private store: Store<AppState>
  ) {
    this.initTopics();
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  initTopics(): void {
    this.topicService
      .getAllTopics()
      .pipe(take(1), share())
      .subscribe((topics) => (this.topics = topics));
  }

  sendTopic(): void {
    this.initTopics();
  }
}
