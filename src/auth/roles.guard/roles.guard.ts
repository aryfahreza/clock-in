import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Read the roles required by the endpoint
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [
        context.getHandler(),
        context.getClass(),
      ],
    );

    // If no @Roles() decorator exists, allow access
    if (!requiredRoles) {
      return true;
    }

    // Get the authenticated user
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user's role is one of the required roles
    return requiredRoles.includes(user.role);
  }
}