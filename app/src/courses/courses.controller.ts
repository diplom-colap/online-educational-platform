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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import UserRoles from "supertokens-node/recipe/userroles";
import { SessionClaimValidator } from 'supertokens-node/recipe/session';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({ summary: 'Add new course' })
  @Post()
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  async create(@Body() createCourseDto: CreateCourseDto) {
    return await this.coursesService.create(createCourseDto);
  }

  @ApiOperation({ summary: 'Get all courses' })
  @Get()
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        (UserRoles.UserRoleClaim.validators.excludes('')),
    ])
  }))
  async findAll() {
    return await this.coursesService.findAll();
  }

  @ApiOperation({ summary: 'Get course by Id' })
  @Get(':id')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        (UserRoles.UserRoleClaim.validators.excludes('')),
    ])
  }))
  async findOne(@Param('id') id: string) {
    return await this.coursesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update course by Id' })
  @Patch(':id')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return await this.coursesService.update(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Delete course by Id' })
  @Delete(':id')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  async remove(@Param('id') id: string) {
    return await this.coursesService.remove(id);
  }
}
