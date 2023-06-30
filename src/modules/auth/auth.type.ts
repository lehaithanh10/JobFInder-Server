import { ERoleName } from "src/shared/model/type";

export interface IUserDataSignWithJWT {
  userId: string;
  role: ERoleName;
}
