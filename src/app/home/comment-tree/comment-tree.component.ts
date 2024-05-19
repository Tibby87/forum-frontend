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
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { User } from '../../model/user/user';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../reducers/user/user.selector';
import { TopicsService } from '../../service/topics/topics.service';
import { TopicsHelperService } from '../../service/topics/topics-helper.service';
import { TopicActionsComponent } from '../topic-actions/topic-actions.component';
import { HasModificationAccessPipe } from '../../pipe/has-modification-access.pipe';

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
    TopicActionsComponent,
    HasModificationAccessPipe,
  ],
})
export class CommentTreeComponent implements OnDestroy {
  @Input() comments: Comment[] = [];
  @Input() topicId: number;
  @Output() commentChanged = new EventEmitter<void>();
  hasModificationAccess$: Observable<boolean>;
  currentUser$: Observable<User>;
  unsubscribe$ = new Subject<void>();
  openTab: number = null;

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

  handleExpandChange(expanded: boolean, commentId: number) {
    if (expanded) {
      this.openTab = commentId;
    } else {
      this.openTab = null;
    }
  }

  handleSendComment(replyToId: number, comment: string) {
    this.currentUser$
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((user) => this.sendComment(user, replyToId, comment))
      )
      .subscribe(() => this.commentChanged.emit());
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

  handeDelete(commentId: number) {
    this.topicService
      .deleteComment(this.topicId, commentId)
      .pipe(tap(() => this.commentChanged.emit()))
      .subscribe();
  }

  handleCommentEdit(commentId: number, value: string) {
    this.topicService
      .updateComment(this.topicId, commentId, { body: value })
      .pipe(tap(() => this.commentChanged.emit()))
      .subscribe();
  }
}
