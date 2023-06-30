import { ERoleName } from 'src/shared/type';

export interface IUserDataSignWithJWT {
  userId: string;
  role: ERoleName;
}
