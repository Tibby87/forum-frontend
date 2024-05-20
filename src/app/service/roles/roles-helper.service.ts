import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';
import { RightsEnum } from '../../model/roles/rights';
import { RightNamesEnum } from '../../model/roles/right-name';
import { RIGHT_NAME_ARRAY } from '../../constant/right-name-array';

@Injectable()
export class RolesHelperService {
  public static convertRightsToBinary(rights: RightsEnum): string {
    return Number(rights).toString(2);
  }

  public static getUserRightArray(
    userRight: RightsEnum
  ): Array<RightNamesEnum> {
    return RIGHT_NAME_ARRAY.slice(
      0,
      RolesHelperService.convertRightsToBinary(userRight).length
    );
  }

  public static getUsersDeniedActions(
    userRight: RightsEnum
  ): Array<RightNamesEnum> {
    return RIGHT_NAME_ARRAY.filter(
      (rightName) =>
        !RolesHelperService.getUserRightArray(userRight).includes(rightName)
    );
  }
}
