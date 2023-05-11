import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('videos')
@ApiTags('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @ApiOperation({ summary: 'Add new video' })
  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    return await this.videosService.create(createVideoDto);
  }

  @ApiOperation({ summary: 'Get all videos' })
  @Get()
  async findAll() {
    return await this.videosService.findAll();
  }

  @ApiOperation({ summary: 'Find video by Id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.videosService.findOne(id);
  }

  @ApiOperation({ summary: 'Update video by Id' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    return await this.videosService.update(id, updateVideoDto);
  }

  @ApiOperation({ summary: 'Delete video by Id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.videosService.remove(id);
  }
}
