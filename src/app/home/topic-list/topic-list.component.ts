import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Topic } from '../../model/topics/topic';
import { CommonModule } from '@angular/common';
import { CommentTreeComponent } from './comment-tree/comment-tree.component';

@Component({
  selector: 'app-topic-list',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, CommentTreeComponent],
  templateUrl: './topic-list.component.html',
  styleUrl: './topic-list.component.scss',
})
export class TopicListComponent {
  @Input() topics!: Array<Topic>;

  constructor() {}
}
