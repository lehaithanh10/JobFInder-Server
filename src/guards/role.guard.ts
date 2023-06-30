import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { ERoleName } from "src/shared/model/type";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<ERoleName[]>(
      ROLES_KEY,
      context.getHandler()
    );

    const { user } = context.switchToHttp().getRequest();

    return !requiredRoles || requiredRoles.includes(user.role);
  }
}
