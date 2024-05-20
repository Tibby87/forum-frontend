import { Pipe, PipeTransform } from '@angular/core';
import { RightsEnum } from '../model/roles/rights';
import { RightNamesEnum } from '../model/roles/right-name';
import { RIGHT_NAME_ARRAY } from '../constant/right-name-array';
import { RolesHelperService } from '../service/roles/roles-helper.service';

@Pipe({
  name: 'getUserRights',
  standalone: true,
})
export class GetUserRightsPipe implements PipeTransform {
  constructor() {}
  transform(userRight: RightsEnum): Array<RightNamesEnum> {
    return RolesHelperService.getUserRightArray(userRight);
  }
}
