import { Pipe, PipeTransform } from '@angular/core';
import { RolesHelperService } from '../service/roles/roles-helper.service';
import { RightsEnum } from '../model/roles/rights';
import { RightNamesEnum } from '../model/roles/right-name';

@Pipe({
  name: 'usersDeniedActivity',
  standalone: true,
})
export class UsersDeniedActivityPipe implements PipeTransform {
  constructor() {}
  transform(userRight: RightsEnum): Array<RightNamesEnum> {
    return RolesHelperService.getUsersDeniedActions(userRight);
  }
}
