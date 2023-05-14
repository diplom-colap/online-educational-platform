import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session/session.decorator';
import {
  SessionClaimValidator,
  SessionContainer,
} from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('admin'),
      ],
    }),
  )
  async getTest(@Session() session: SessionContainer): Promise<string> {
    // TODO: magic
    const userID = session.getUserId();
    console.log(userID);
    return 'magic';
  }
}
