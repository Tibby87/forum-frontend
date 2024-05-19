import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MicroserviceName } from '../../model/rest/microservice-name';
import { RestResponse } from '../../model/rest/rest-response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class RestHelperService {
  constructor(private _snackBar: MatSnackBar) {}

  public getData<T>(): (source: Observable<RestResponse<T>>) => Observable<T> {
    return (source: Observable<RestResponse<T>>): Observable<T> =>
      source.pipe(map((response) => response.data));
  }

  public handleError<T>(): (
    source: Observable<RestResponse<T>>
  ) => Observable<any> {
    return (source: Observable<RestResponse<T>>): Observable<any> =>
      source.pipe(
        catchError((error: HttpErrorResponse) => {
          this._snackBar.open(
            error?.error?.['message'] ?? error?.message ?? error.status
          );
          throw error;
        })
      );
  }

  public getRequestUrl(
    microservice: MicroserviceName,
    subPath?: string
  ): string {
    return `${environment.baseUrl}/${microservice}${
      subPath ? '/' + subPath : ''
    }`;
  }
}
