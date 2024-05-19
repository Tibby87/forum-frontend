import { RightNamesEnum } from '../model/roles/right-name';

export const RIGHT_NAME_ARRAY: Array<RightNamesEnum> = [
  RightNamesEnum.READ,
  RightNamesEnum.ADD_DELETE_COMMENTS,
  RightNamesEnum.ADD_DELETE_TOPICS,
  RightNamesEnum.DELETE_OTHERS_COMMENTS_TOPICS,
] as const;
