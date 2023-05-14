import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('lessons')
@ApiTags('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiOperation({ summary: 'Add new lesson' })
  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    return await this.lessonsService.create(createLessonDto);
  }

  @ApiOperation({ summary: 'Get all lessons' })
  @Get()
  async findAll() {
    return await this.lessonsService.findAll();
  }

  @ApiOperation({ summary: 'Find lesson by Id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.lessonsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update lesson by Id' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return await this.lessonsService.update(id, updateLessonDto);
  }

  @ApiOperation({ summary: 'Delete lesson by Id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.lessonsService.remove(id);
  }
}
