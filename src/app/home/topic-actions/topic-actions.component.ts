import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  EditContentDialogComponent,
  EditContentDialogProps,
} from './edit-content-dialog/edit-content-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {
  TopicActionContext,
  TopicActionDialogBaseProps,
} from './topic-action-context';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';

@Component({
  selector: 'app-topic-actions',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    EditContentDialogComponent,
    ConfirmationDialogComponent,
  ],
  templateUrl: './topic-actions.component.html',
  styleUrl: './topic-actions.component.scss',
})
export class TopicActionsComponent {
  @Input() contentToEdit: string;
  @Input() context: TopicActionContext;
  @Input() hasAccess: boolean;
  @Input() hideDelete = false;
  @Input() hideEdit = false;
  @Output() deleteConfirmed = new EventEmitter<void>();
  @Output() contentModified = new EventEmitter<string>();

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  handleEditClick(): void {
    this.dialog
      .open<EditContentDialogComponent, EditContentDialogProps, string>(
        EditContentDialogComponent,
        {
          data: { content: this.contentToEdit, context: this.context },
          panelClass: 'dialog-wrapper',
        }
      )
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.contentModified.emit(result);
        }
      });
  }

  hanndleDeleteClick(): void {
    this.dialog
      .open<ConfirmationDialogComponent, TopicActionDialogBaseProps, boolean>(
        ConfirmationDialogComponent,
        {
          panelClass: 'dialog-wrapper',
          data: { context: this.context },
        }
      )
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.deleteConfirmed.emit();
        }
      });
  }
}
