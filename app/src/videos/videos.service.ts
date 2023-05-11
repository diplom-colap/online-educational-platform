import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideosService {
  constructor(private prismaService: PrismaService) {}

  async create(createVideoDto: CreateVideoDto) {
    return await this.prismaService.video.create({ data: createVideoDto });
  }

  async findAll() {
    return await this.prismaService.video.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.video.findFirstOrThrow({ where: { id } });
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    return await this.prismaService.video.update({
      where: { id },
      data: updateVideoDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.video.delete({ where: { id } });
  }
}
