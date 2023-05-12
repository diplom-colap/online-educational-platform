import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Role } from '@prisma/client';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  @Roles(Role.LEARNER)
  @UseGuards(new AuthGuard())

  @UseGuards()
  async getTest(@Session() session: SessionContainer): Promise<string> {
    // TODO: magic
    return "magic";
  }
}
