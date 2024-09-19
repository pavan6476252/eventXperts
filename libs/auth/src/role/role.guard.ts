import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core"; 
import { ROLE_TYPE, USER_ROLE_KEY } from "@app/shared";
import { AuthenticatedRequest } from "../interface/authenticated-request.interface";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<ROLE_TYPE[]>(
      USER_ROLE_KEY,
      context.getHandler(),
    );

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user || !user.roles) {
      throw new ForbiddenException('Access denied: No roles found.');
    }

    const hasRole = user.roles.some((role) => roles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException('Access denied: Insufficient role.');
    }

    return hasRole;
  }
}
