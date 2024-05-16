import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../model/rest/rest-response';
import { Observable } from 'rxjs';
import { RestHelperService } from './rest-helper.service';
import { RequestArguments } from '../../model/rest/request-arguments';

@Injectable({ providedIn: 'root' })
export class RestService {
  constructor(private http: HttpClient) {}
  public get<T>(
    params: RequestArguments,
    httpParams?: HttpParams
  ): Observable<T> {
    return this.http
      .get<RestResponse<T>>(
        RestHelperService.getRequestUrl(params.microservice, params.subPath),
        { params: httpParams }
      )
      .pipe(RestHelperService.handleError(), RestHelperService.getData());
  }

  public post<T>(params: RequestArguments): Observable<T> {
    return this.http
      .post<RestResponse<T>>(
        RestHelperService.getRequestUrl(params.microservice, params.subPath),
        params.body
      )
      .pipe(RestHelperService.handleError(), RestHelperService.getData());
  }

  public put<T>(params: RequestArguments): Observable<T> {
    return this.http
      .put<RestResponse<T>>(
        RestHelperService.getRequestUrl(params.microservice, params.subPath),
        params.body
      )
      .pipe(RestHelperService.handleError(), RestHelperService.getData());
  }

  public delete<T>(params: RequestArguments): Observable<T> {
    return this.http
      .delete<RestResponse<T>>(
        RestHelperService.getRequestUrl(params.microservice, params.subPath),
        {
          body: params.body,
        }
      )
      .pipe(RestHelperService.handleError(), RestHelperService.getData());
  }
}
