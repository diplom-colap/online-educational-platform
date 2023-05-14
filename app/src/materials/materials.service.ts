import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaterialsService {
  constructor(private prismaService: PrismaService) {}

  async create(createMaterialDto: CreateMaterialDto) {
    return await this.prismaService.material.create({
      data: createMaterialDto,
    });
  }

  async findAll() {
    return await this.prismaService.material.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.material.findFirstOrThrow({
      where: { id },
    });
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto) {
    return await this.prismaService.material.update({
      where: { id },
      data: updateMaterialDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.material.delete({ where: { id } });
  }
}
