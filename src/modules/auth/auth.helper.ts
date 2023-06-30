import { ERoleName } from "src/shared/model/type";

export const checkIsEmployerCredential = (data: { role: ERoleName }) => {
  return data.role === ERoleName.EMPLOYERS;
};
export const checkIsEmployeeCredential = (data: { role: ERoleName }) => {
  return data.role === ERoleName.EMPLOYEES;
};
