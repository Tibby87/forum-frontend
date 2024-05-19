import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Author } from '../../model/topics/author';
import { IsCurrentUserPipe } from '../../pipe/is-current-user.pipe';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Observable, take } from 'rxjs';
import { selectUserHasRight } from '../../reducers/roles/roles.selctor';
import { RightNamesEnum } from '../../model/roles/right-name';

@Component({
  selector: 'app-leave-comment',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    IsCurrentUserPipe,
  ],
  templateUrl: './leave-comment.component.html',
  styleUrl: './leave-comment.component.scss',
})
export class LeaveCommentComponent {
  @Input() originalAuthor!: Author;
  @Output() commentEmmitted: EventEmitter<string> = new EventEmitter<string>();
  error: LeaveACommentErrorMessage | null = null;
  commentBody: string;
  addCommentAccess$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.addCommentAccess$ = this.store.select(
      selectUserHasRight(RightNamesEnum.ADD_DELETE_COMMENTS)
    );
  }

  handleChange() {
    if (this.error && this.commentBody) {
      this.error = null;
    }
  }

  initCommentSend() {
    this.addCommentAccess$.pipe(take(1)).subscribe((hasAccess) => {
      if (!hasAccess) {
        this.handleNoAccess();
        return;
      }
      this.handleCommentBeforeSend();
    });
  }

  private handleNoAccess() {
    this.setError(
      "You you don't have the right to add comments. Please subscribe."
    );
  }

  private handleCommentBeforeSend() {
    if (!this.commentBody) {
      this.setError('Cannot send empty comment');
      return;
    }
    this.emitComment();
  }

  private emitComment() {
    this.commentEmmitted.emit(this.commentBody);
  }

  private setError(error: LeaveACommentErrorMessage | null) {
    this.error = error;
  }
}

export type LeaveACommentErrorMessage =
  | 'Cannot send empty comment'
  | "You you don't have the right to add comments. Please subscribe.";
