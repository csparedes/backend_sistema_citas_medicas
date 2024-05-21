import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentEntity } from './entities/appointment.entity';

@Controller('appointments')
@ApiTags('Appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiResponse({status: 201, description: "Appointment created", type: AppointmentEntity})
  @ApiResponse({status: 400, description: 'Bad Request'})
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiResponse({status: 200, description: "The records has been retrieved", type: [AppointmentEntity]})
  @ApiResponse({status: 400, description: 'Bad Request'})
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'The record has been retrieved', type: AppointmentEntity })
  @ApiResponse({status: 400, description: 'Bad Request'})
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({status: 200, description: 'Te record has been updated', type: AppointmentEntity})
  @ApiResponse({status: 400, description: 'Bad Request'})
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiResponse({status: 200, description: 'The record has been deleted', type: AppointmentEntity})
  @ApiResponse({status: 400, description: 'Bad Request'})
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
