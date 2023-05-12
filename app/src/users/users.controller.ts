import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import UserRoles from "supertokens-node/recipe/userroles";
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SessionClaimValidator } from 'supertokens-node/recipe/session';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Find user by Id' })
  @Get(':id')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update user by Id' })
  @Patch(':id')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user by Id' })
  @Delete(':id')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
