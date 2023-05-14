import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    return await this.prismaService.comment.create({ data: createCommentDto });
  }

  async findAll() {
    return await this.prismaService.comment.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.comment.findFirstOrThrow({ where: { id } });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return await this.prismaService.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.comment.delete({ where: { id } });
  }
}
