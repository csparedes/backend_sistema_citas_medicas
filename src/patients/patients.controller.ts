import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientEntity } from './entities/patient.entity';

@Controller('patients')
@ApiTags('Patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiResponse({status: 201, description: 'The record has been successfully created.', type: PatientEntity})
  @ApiResponse({status: 400, description: 'Bad Request'})
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiResponse({status: 200, description: 'The records have been successfully retrieved.', type: [PatientEntity]})
  @ApiResponse({status: 400, description: 'Bad Request'})
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'The record has been successfully retrieved.', type: PatientEntity})
  @ApiResponse({status: 400, description: 'Bad Request'})
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({status: 200, description: 'The record has been successfully updated.', type: PatientEntity})
  @ApiResponse({status: 400, description: 'Bad Request'})
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @ApiResponse({status: 200, description: 'The record has been successfully deleted.', type: PatientEntity})
  @ApiResponse({status: 400, description: 'Bad Request'})
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
