import { ERoleName } from "../../shared/type";

export enum EUserIdentifierType {
  CREDENTIAL = "credential",
  GOOGLE = "google",
  FACEBOOK = "facebook",
}
export interface IUserData {
  userId: string;
  identifier: string;
  identifierType: ERoleName;
  id: string;
}
