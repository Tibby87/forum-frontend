import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectCurrentUser } from '../reducers/user/user.selector';

@Pipe({
  name: 'isCurrentUser',
  standalone: true,
})
export class IsCurrentUserPipe implements PipeTransform {
  constructor(private store: Store<AppState>) {}
  transform(userId: number): Observable<boolean> {
    return this.store
      .select(selectCurrentUser)
      .pipe(map((user) => user.id === userId));
  }
}
