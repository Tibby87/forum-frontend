import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Topic } from '../../model/topics/topic';
import { CommonModule } from '@angular/common';
import { CommentTreeComponent } from '../comment-tree/comment-tree.component';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { User } from '../../model/user/user';
import { AppState } from '../../reducers';
import { LeaveCommentComponent } from '../leave-comment/leave-comment.component';
import {
  selectCurrentUser,
  selectUsers,
} from '../../reducers/user/user.selector';
import { TopicsService } from '../../service/topics/topics.service';
import { TopicsHelperService } from '../../service/topics/topics-helper.service';

@Component({
  selector: 'app-topic-list',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatButtonModule,
    CommentTreeComponent,
    LeaveCommentComponent,
  ],
  templateUrl: './topic-list.component.html',
  styleUrl: './topic-list.component.scss',
})
export class TopicListComponent {
  @Input() topics!: Array<Topic>;
  @Output() commentSent = new EventEmitter<void>();

  users$?: Observable<User[]>;
  currentUser$?: Observable<User>;

  constructor(
    private store: Store<AppState>,
    private topicService: TopicsService
  ) {
    this.users$ = this.store.select(selectUsers);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  handleSendComment(topicId: number, commentBody: string) {
    this.currentUser$
      .pipe(
        take(1),
        switchMap((user) =>
          this.topicService.addCommentToTopic(topicId, {
            body: commentBody,
            author: TopicsHelperService.mapUserToAuthor(user),
          })
        )
      )
      .subscribe(() => {
        this.commentSent.emit();
      });
  }
}
