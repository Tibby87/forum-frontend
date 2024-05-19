import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TopicActionDialogBaseProps } from '../topic-action-context';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-content-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './edit-content-dialog.component.html',
  styleUrl: './edit-content-dialog.component.scss',
})
export class EditContentDialogComponent {
  newContent: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditContentDialogProps) {
    this.newContent = data.content ?? '';
  }
}

export interface EditContentDialogProps extends TopicActionDialogBaseProps {
  content: string;
}
