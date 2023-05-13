import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService],
  exports: [UsersService],
})
export class UsersModule {}
