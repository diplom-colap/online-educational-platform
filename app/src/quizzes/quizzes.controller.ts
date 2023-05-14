import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('quizzes')
@ApiTags('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiOperation({ summary: 'Add new quizz' })
  async create(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizzesService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all quizzes' })
  async findAll() {
    return await this.quizzesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find quizz by Id' })
  async findOne(@Param('id') id: string) {
    return await this.quizzesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update quizz by Id' })
  async update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return await this.quizzesService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quizz by Id' })
  async remove(@Param('id') id: string) {
    return await this.quizzesService.remove(id);
  }
}
