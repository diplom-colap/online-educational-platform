import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private prismaService: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    return await this.prismaService.quizz.create({ data: createQuizDto });
  }

  async findAll() {
    return await this.prismaService.quizz.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.quizz.findFirstOrThrow({ where: { id } });
  }

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    return await this.prismaService.quizz.update({
      where: { id },
      data: updateQuizDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.quizz.delete({ where: { id } });
  }
}
