import { RightsEnum } from './rights';
import { RoleName } from './role-name';

export interface Role {
  id: number;
  name: RoleName;
  rights: RightsEnum;
}
