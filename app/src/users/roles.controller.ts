import {
    Controller,
    Get,
    Post,
    Param,
    Delete,
    UseGuards,
  } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import UserRoles from "supertokens-node/recipe/userroles";
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionClaimValidator } from 'supertokens-node/recipe/session';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
constructor(private readonly roleService: RolesService) {} 

@ApiOperation({ summary: 'Create a Role' })
@Post(':roleName')
@UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
async createRole(@Param('roleName') roleName: string) {
    return await this.roleService.createRole(roleName);
}

@ApiOperation({ summary: 'get users that have role' })
@Get(':roleName')
@UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
async getUsersThatHaveRole(@Param('roleName') roleName: string) {
    return await this.roleService.getUsersOnSPThatHaveRole(roleName);
}

@ApiOperation({ summary: 'get all role' })
@Get()
@UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
async getAllRoleOnSP() {
    return await this.roleService.getAllRoles();
}

@ApiOperation({ summary: 'delete role' })
@Delete(':roleName')
@UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
async deleteRole(@Param('roleName') roleName: string) {
    return await this.roleService.deleteRole(roleName);
}
}
  