import { SetMetadata } from '@nestjs/common';
import { ERoleName } from 'src/shared/type';

export const ROLES_KEY = 'JOB_FINDER_ROLE_KEY';
export const Roles = (...roles: ERoleName[]) => SetMetadata(ROLES_KEY, roles);
