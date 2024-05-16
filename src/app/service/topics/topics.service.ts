import { Observable } from 'rxjs';
import { Topic } from '../../model/topics/topic';
import { RestService } from '../rest/rest.service';
import { Injectable } from '@angular/core';

// - GET /api/topics
// - POST /api/topic/add
// - GET /api/topic/:id
// - PUT /api/topic/:id
// - DELETE /api/topic/:id
// - POST /api/topic/:id/comment/add
// - PUT /api/topic/:topicId/comment/:commentId
// - DELETE /api/topic/:topicId/comment/:commentId
// - POST /api/topic/:topicId/comment/:commentId/add

@Injectable({ providedIn: 'root' })
export class TopicsService {
  constructor(private restService: RestService) {}

  public getAllTopics(): Observable<Array<Topic>> {
    return this.restService.get<Array<Topic>>({ microservice: 'topics' });
  }

  public addTopic(body: Partial<Topic>): Observable<Topic> {
    return this.restService.post<Topic>({ microservice: 'topic', body });
  }

  public getTopicById(topicId: number): Observable<Topic> {
    return this.restService.get<Topic>({
      microservice: 'topic',
      subPath: String(topicId),
    });
  }

  public updateTopic(topicId: number, body: any): Observable<Topic> {
    return this.restService.put<Topic>({
      microservice: 'topic',
      subPath: String(topicId),
      body,
    });
  }

  public deleteTopic(topicId: number): Observable<any> {
    return this.restService.delete({
      microservice: 'topic',
      subPath: String(topicId),
    });
  }

  public addCommentToTopic(
    topicId: number,
    body: Partial<Comment>
  ): Observable<Comment> {
    return this.restService.post<Comment>({
      microservice: 'topic',
      subPath: String(topicId),
      body,
    });
  }

  public updateComment(
    topicId: number,
    commentId: number,
    body: Partial<Comment>
  ): Observable<Comment> {
    return this.restService.put<Comment>({
      microservice: 'topic',
      subPath: `${topicId}/comment/${commentId}`,
      body,
    });
  }

  public deleteComment(topicId: number, commentId: number): Observable<any> {
    return this.restService.delete({
      microservice: 'topic',
      subPath: `${topicId}/comment/${commentId}`,
    });
  }

  public replyToComment(
    topicId: number,
    commentId: number,
    body: Partial<Comment>
  ): Observable<Comment> {
    return this.restService.post<Comment>({
      microservice: 'topic',
      subPath: `${topicId}/comment/${commentId}/add`,
      body,
    });
  }
}
