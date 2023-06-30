export enum ECollectionName {
  USERS = "users",
  APPLICATIONS = "applications",
  EMPLOYEES = "employees",
  EMPLOYERS = "employers",
  JOB_POST = "job-posts",
  RESUMES = "resumes",
  JOB_CATEGORY = "job-categories",
}

export enum ERoleName {
  EMPLOYEES = "jb-employees",
  EMPLOYERS = "jb-employers",
}

export interface IPagination {
  page: number;
  pageSize: number;
  offset: number;
  limit: number;
  total?: number;
}

export const DEFAULT_PAGINATION = {
  page: 1,
  pageSize: 50,
  offset: 0,
  limit: 50,
};
