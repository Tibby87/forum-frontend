import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comment } from '../../../model/topics/comment';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss'],
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
})
export class CommentTreeComponent {
  @Input() comments: Comment[] = [];
}
