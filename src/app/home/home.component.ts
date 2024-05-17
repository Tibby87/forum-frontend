import { Component } from '@angular/core';
import { Observable, share, take } from 'rxjs';
import { Topic } from '../model/topics/topic';
import { TopicsService } from '../service/topics/topics.service';
import { TopicListComponent } from './topic-list/topic-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopicListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  topics$!: Observable<Array<Topic>>;

  constructor(private topicService: TopicsService) {
    this.initTopics();
  }

  initTopics(): void {
    this.topics$ = this.topicService.getAllTopics().pipe(take(1), share());
  }

  sendTopic(): void {
    this.topicService.addTopic({ title: 'Metal Music' }).subscribe(() => {});
  }
}
