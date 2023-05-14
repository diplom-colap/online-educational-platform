import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prismaService: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
    return await this.prismaService.lesson.create({ data: createLessonDto });
  }

  async findAll() {
    return await this.prismaService.lesson.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.lesson.findFirstOrThrow({ where: { id } });
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    return await this.prismaService.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.lesson.delete({ where: { id } });
  }
}
