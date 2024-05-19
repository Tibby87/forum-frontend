import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Comment } from '../../model/topics/comment';
import { MatExpansionModule } from '@angular/material/expansion';
import { LeaveCommentComponent } from '../leave-comment/leave-comment.component';
import { IsCurrentUserPipe } from '../../pipe/is-current-user.pipe';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { User } from '../../model/user/user';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../reducers/user/user.selector';
import { TopicsService } from '../../service/topics/topics.service';
import { TopicsHelperService } from '../../service/topics/topics-helper.service';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    LeaveCommentComponent,
    IsCurrentUserPipe,
  ],
})
export class CommentTreeComponent implements OnDestroy {
  @Input() comments: Comment[] = [];
  @Input() topicId: number;
  @Output() commentSent = new EventEmitter<void>();
  currentUser$: Observable<User>;
  unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private topicService: TopicsService
  ) {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleSendComment(replyToId: number, comment: string) {
    this.currentUser$
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((user) => this.sendComment(user, replyToId, comment))
      )
      .subscribe(() => this.commentSent.emit());
  }

  private sendComment(
    user: User,
    replyToId: number,
    comment: string
  ): Observable<any> {
    return this.topicService.replyToComment(
      this.topicId,
      replyToId,
      this.getCommentRequestBody(user, comment)
    );
  }

  private getCommentRequestBody(user: User, comment: string): Partial<Comment> {
    return {
      author: TopicsHelperService.mapUserToAuthor(user),
      body: comment,
    };
  }
}
