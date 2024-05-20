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
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopicListComponent,
    CommonModule,
    MatProgressSpinnerModule,
    CreateTopicComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  topics!: Array<Topic>;
  currentUser$?: Observable<User>;

  constructor(
    private topicService: TopicsService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
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

  showModificationSnackBar(): void {
    this.snackBar.open('Successfully action', null, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
