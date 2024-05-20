import { RightsEnum } from './rights';
import { RoleIdEnum } from './role-id';
import { RoleNameEnum } from './role-name';

export interface Role {
  id: RoleIdEnum;
  name: RoleNameEnum;
  rights: RightsEnum;
}
