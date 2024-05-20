import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-to-role-editor',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule],
  templateUrl: './user-to-role-editor.component.html',
  styleUrl: './user-to-role-editor.component.scss',
})
export class UserToRoleEditorComponent {}
