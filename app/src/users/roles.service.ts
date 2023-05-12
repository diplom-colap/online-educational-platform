import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import UserRoles, { PermissionClaim, UserRoleClaim } from "supertokens-node/recipe/userroles";
import { SessionContainer } from 'supertokens-node/recipe/session';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}
  //// ROLE 
  async createRole(roleName: string) {
    const response = await UserRoles.createNewRoleOrAddPermissions(roleName, []);

    if (response.createdNewRole === false) {
        // The role already exists
    }
  }

  async getUsersOnSPThatHaveRole(role: string) {
    const response = await UserRoles.getUsersThatHaveRole(role);

    if (response.status === "UNKNOWN_ROLE_ERROR") {
        // No such role exists
        return;
    }

    const users: string[] = response.users;
    return users;
  }

  async addRolesAndPermissionsToSession(session: SessionContainer) {
    // we add the user's roles to the user's session
    await session.fetchAndSetClaim(UserRoleClaim)
    // we add the permissions of a user to the user's session
    await session.fetchAndSetClaim(PermissionClaim)
  }

  async removeRoleFromUserAndTheirSession(session: SessionContainer, roleName: string) {
    const response = await UserRoles.removeUserRole(session.getUserId(), roleName);

    // remove role in own db
    const userId = session.getUserId();
    const user = await this.prismaService.user.findFirstOrThrow({where: { id: userId }});   
    if (user.role == roleName) 
    {
      user.role = null;
    }
    
    if (response.status === "UNKNOWN_ROLE_ERROR") {
        // No such role exists
        return;
    }

    if (response.didUserHaveRole === false) {
        // The user was never assigned the role
    } else {
        // We also want to update the session of this user to reflect this change.
        await session.fetchAndSetClaim(UserRoles.UserRoleClaim);
        await session.fetchAndSetClaim(UserRoles.PermissionClaim);
    }
  }
  async getAllRoles() {
    const roles: string[] = (await UserRoles.getAllRoles()).roles;
    return roles;
  }

  async deleteRole(role : string) {
    // Delete the user role
    const response = await UserRoles.deleteRole(role);

    if (!response.didRoleExist) {
        // There was no such role
    }
  }
}
