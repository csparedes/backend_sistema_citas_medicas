import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicsService } from './medics.service';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MedicEntity } from './entities/medic.entity';

@Controller('medics')
@ApiTags('Medics')
export class MedicsController {
  constructor(private readonly medicsService: MedicsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Medic created successfully', type: MedicEntity })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createMedicDto: CreateMedicDto) {
    return this.medicsService.create(createMedicDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Medics found successfully', type: [MedicEntity] })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    return this.medicsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Medic found successfully', type: MedicEntity })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.medicsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Medic updated successfully', type: MedicEntity })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateMedicDto: UpdateMedicDto) {
    return this.medicsService.update(+id, updateMedicDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Medic deleted successfully', type: MedicEntity })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.medicsService.remove(+id);
  }
}
