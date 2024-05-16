import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../model/rest/rest-response';
import { MicroserviceName } from '../../model/rest/microservice-name';
import { Observable } from 'rxjs';
import { RestHelperService } from './rest-helper.service';

@Injectable({ providedIn: 'root' })
export class RestService {
  constructor(private http: HttpClient) {}
  public get<T>(
    microservice: MicroserviceName,
    subPath?: string,
    params?: HttpParams
  ): Observable<T> {
    return this.http
      .get<RestResponse<T>>(
        RestHelperService.getRequestUrl(microservice, subPath),
        {
          params,
        }
      )
      .pipe(RestHelperService.handleError(), RestHelperService.getData());
  }

  public post<T>(
    microservice: MicroserviceName,
    body: any,
    subPath?: string
  ): Observable<T> {
    return this.http
      .post<RestResponse<T>>(
        RestHelperService.getRequestUrl(microservice, subPath),
        body
      )
      .pipe(RestHelperService.handleError(), RestHelperService.getData());
  }

  public put<T>(
    microservice: MicroserviceName,
    body: any,
    subPath?: string
  ): Observable<T> {
    return this.http
      .put<RestResponse<T>>(
        RestHelperService.getRequestUrl(microservice, subPath),
        body
      )
      .pipe(RestHelperService.handleError(), RestHelperService.getData());
  }

  public delete<T>(
    microservice: MicroserviceName,
    subPath?: string,
    body?: any
  ): Observable<T> {
    return this.http
      .delete<RestResponse<T>>(
        RestHelperService.getRequestUrl(microservice, subPath),
        {
          body,
        }
      )
      .pipe(RestHelperService.handleError(), RestHelperService.getData());
  }
}
