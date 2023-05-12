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
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import UserRoles from "supertokens-node/recipe/userroles";
import { SessionClaimValidator } from 'supertokens-node/recipe/session';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('materials')
@ApiTags('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @ApiOperation({ summary: 'Add new material' })
  @Post()
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  async create(@Body() createMaterialDto: CreateMaterialDto) {
    return await this.materialsService.create(createMaterialDto);
  }

  @ApiOperation({ summary: 'Get all materials' })
  @Get()
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        (UserRoles.UserRoleClaim.validators.excludes('')),
    ])
  }))
  async findAll() {
    return await this.materialsService.findAll();
  }

  @ApiOperation({ summary: 'Find material by Id' })
  @Get(':id')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        (UserRoles.UserRoleClaim.validators.excludes('')),
    ])
  }))
  async findOne(@Param('id') id: string) {
    return await this.materialsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update material by Id' })
  @Patch(':id')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  async update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return await this.materialsService.update(id, updateMaterialDto);
  }

  @ApiOperation({ summary: 'Delete material by Id' })
  @Delete(':id')
  @UseGuards(new AuthGuard({
    overrideGlobalClaimValidators: async (globalValidators: SessionClaimValidator[]) => ([
        ...globalValidators, 
        UserRoles.UserRoleClaim.validators.includes("admin"),
    ])
  }))
  async remove(@Param('id') id: string) {
    return await this.materialsService.remove(id);
  }
}
