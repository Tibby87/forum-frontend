import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable, Subject, filter, map, switchMap, takeUntil } from 'rxjs';
import { User } from '../model/user/user';
import { selectCurrentUser } from '../reducers/user/user.selector';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserFormComponent } from './user-form/user-form.component';
import { selectUserRole } from '../reducers/roles/roles.selctor';
import { Role } from '../model/roles/role';
import { Comment } from '../model/topics/comment';
import { TopicsService } from '../service/topics/topics.service';
import { Topic } from '../model/topics/topic';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    UserFormComponent,
    UserInfoComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnDestroy {
  user$?: Observable<User>;
  userRole$: Observable<Role>;
  unsubscribe$ = new Subject<void>();
  userActivityCount$: Observable<UserActivityCount>;

  constructor(
    private store: Store<AppState>,
    private topicService: TopicsService
  ) {
    this.user$ = this.store.select(selectCurrentUser);
    this.userRole$ = this.store.select(selectUserRole);
    this.userActivityCount$ = this.getUserActivityCount();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getUserActivityCount(): Observable<UserActivityCount> {
    return this.user$.pipe(
      filter((user) => !!user),
      takeUntil(this.unsubscribe$),
      switchMap((user) => this.getCountFromTopics(user))
    );
  }

  private getCountFromTopics(user: User): Observable<UserActivityCount> {
    return this.topicService.getAllTopics().pipe(
      map((topics) => {
        return {
          comments: this.getUserCommentCount(topics, user.id),
          topics: this.getUserTopicCount(topics, user.id),
        };
      })
    );
  }

  private getUserTopicCount(topics: Array<Topic>, userId: number): number {
    return topics.filter((topic) => topic.author.id === userId).length;
  }

  private getUserCommentCount(topics: Array<Topic>, userId: number): number {
    let commentCount = 0;

    const traverseComments = (comments: Array<Comment>) => {
      for (const comment of comments) {
        if (comment.author.id === userId) {
          commentCount++;
        }
        if (comment.comments && comment.comments.length > 0) {
          traverseComments(comment.comments);
        }
      }
    };

    topics.forEach((topic) => traverseComments(topic.comments));

    return commentCount;
  }
}

export interface UserActivityCount {
  topics: number;
  comments: number;
}
