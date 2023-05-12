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
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionClaimValidator } from 'supertokens-node/recipe/session';
import UserRoles from "supertokens-node/recipe/userroles";

@Controller('quizzes')
@ApiTags('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiOperation({ summary: 'Add new quizz' })
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  async create(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizzesService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all quizzes' })
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("learner"),
    ])
  }))
  async findAll() {
    return await this.quizzesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find quizz by Id' })
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("learner"),
    ])
  }))
  async findOne(@Param('id') id: string) {
    return await this.quizzesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update quizz by Id' })
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  async update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return await this.quizzesService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quizz by Id' })
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  async remove(@Param('id') id: string) {
    return await this.quizzesService.remove(id);
  }
}
