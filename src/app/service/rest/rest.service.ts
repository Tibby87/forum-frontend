import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../model/rest/rest-response';
import { Observable } from 'rxjs';
import { RestHelperService } from './rest-helper.service';
import { RequestArguments } from '../../model/rest/request-arguments';

@Injectable({ providedIn: 'root' })
export class RestService {
  constructor(
    private http: HttpClient,
    private helperService: RestHelperService
  ) {}

  public get<T>(
    params: RequestArguments,
    httpParams?: HttpParams
  ): Observable<T> {
    return this.http
      .get<RestResponse<T>>(
        this.helperService.getRequestUrl(params.microservice, params.subPath),
        { params: httpParams }
      )
      .pipe(this.helperService.handleError(), this.helperService.getData());
  }

  public post<T>(params: RequestArguments): Observable<T> {
    return this.http
      .post<RestResponse<T>>(
        this.helperService.getRequestUrl(params.microservice, params.subPath),
        params.body
      )
      .pipe(this.helperService.handleError(), this.helperService.getData());
  }

  public put<T>(params: RequestArguments): Observable<T> {
    return this.http
      .put<RestResponse<T>>(
        this.helperService.getRequestUrl(params.microservice, params.subPath),
        params.body
      )
      .pipe(this.helperService.handleError(), this.helperService.getData());
  }

  public delete<T>(params: RequestArguments): Observable<T> {
    return this.http
      .delete<RestResponse<T>>(
        this.helperService.getRequestUrl(params.microservice, params.subPath),
        {
          body: params.body,
        }
      )
      .pipe(this.helperService.handleError(), this.helperService.getData());
  }
}
