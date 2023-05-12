import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UsersService } from 'src/users/users.service';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    var userID = context.switchToHttp().getRequest().headers['user-id'];
    var user = await this.usersService.findOne(userID);

    console.log(requiredRoles);
    console.log(user.role);
    
    // console.log(requiredRoles.some((role) => user.roles?.includes(role)))
    return requiredRoles.some((role) => user.role == role);
    // return false;
  }
}