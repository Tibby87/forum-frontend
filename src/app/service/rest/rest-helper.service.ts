import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MicroserviceName } from '../../model/rest/microservice-name';
import { RestResponse } from '../../model/rest/rest-response';

@Injectable({ providedIn: 'root' })
export class RestHelperService {
  public static getData<T>(): (
    source: Observable<RestResponse<T>>
  ) => Observable<T> {
    return (source: Observable<RestResponse<T>>): Observable<T> =>
      source.pipe(map((response) => response.data));
  }

  public static handleError<T>(): (
    source: Observable<RestResponse<T>>
  ) => Observable<any> {
    return (source: Observable<RestResponse<T>>): Observable<any> =>
      source.pipe(
        catchError((error: HttpErrorResponse) => {
          alert(error.error['message']);
          throw error;
        })
      );
  }

  public static getRequestUrl(
    microservice: MicroserviceName,
    subPath?: string
  ): string {
    return `${environment.baseUrl}/${microservice}${
      subPath ? '/' + subPath : ''
    }`;
  }
}
