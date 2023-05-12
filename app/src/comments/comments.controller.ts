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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import UserRoles from "supertokens-node/recipe/userroles";
import { SessionClaimValidator } from 'supertokens-node/recipe/session';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Add new comment' })
  @Post()
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        (UserRoles.UserRoleClaim.validators.excludes('')),
    ])
  }))
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @Get()
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        (UserRoles.UserRoleClaim.validators.excludes('')),
    ])
  }))
  async findAll() {
    return await this.commentsService.findAll();
  }

  @ApiOperation({ summary: 'Get comment by Id' })
  @Get(':id')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        (UserRoles.UserRoleClaim.validators.excludes('')),
    ])
  }))
  async findOne(@Param('id') id: string) {
    return await this.commentsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update comment by Id' })
  @Patch(':id')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        (UserRoles.UserRoleClaim.validators.excludes('')),
    ])
  }))
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentsService.update(id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete comment by Id' })
  @Delete(':id')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        (UserRoles.UserRoleClaim.validators.excludes('')),
    ])
  }))
  async remove(@Param('id') id: string) {
    return await this.commentsService.remove(id);
  }
}
