import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('materials')
@ApiTags('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @ApiOperation({ summary: 'Add new material' })
  @Post()
  async create(@Body() createMaterialDto: CreateMaterialDto) {
    return await this.materialsService.create(createMaterialDto);
  }

  @ApiOperation({ summary: 'Get all materials' })
  @Get()
  async findAll() {
    return await this.materialsService.findAll();
  }

  @ApiOperation({ summary: 'Find material by Id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.materialsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update material by Id' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return await this.materialsService.update(id, updateMaterialDto);
  }

  @ApiOperation({ summary: 'Delete material by Id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.materialsService.remove(id);
  }
}
