import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { AppState } from '../reducers';
import { selectIsCurrentUser } from '../reducers/user/user.selector';
import { selectUserHasRight } from '../reducers/roles/roles.selctor';
import { RightNamesEnum } from '../model/roles/right-name';

@Pipe({
  name: 'hasModificationAccess',
  standalone: true,
})
export class HasModificationAccessPipe implements PipeTransform {
  constructor(private store: Store<AppState>) {}

  transform(authorId: number, type: 'comment' | 'topic'): Observable<boolean> {
    const rightToCheck: RightNamesEnum =
      type === 'comment'
        ? RightNamesEnum.ADD_DELETE_COMMENTS
        : RightNamesEnum.ADD_DELETE_TOPICS;
    return combineLatest([
      this.store.select(selectIsCurrentUser(authorId)),
      this.store.select(selectUserHasRight(rightToCheck)),
      this.store.select(
        selectUserHasRight(RightNamesEnum.DELETE_OTHERS_COMMENTS_TOPICS)
      ),
    ]).pipe(
      map(([isCurrentUser, hasModAccess, hasAdminLevelModAccess]) => {
        return (isCurrentUser && hasModAccess) || hasAdminLevelModAccess;
      })
    );
  }
}
