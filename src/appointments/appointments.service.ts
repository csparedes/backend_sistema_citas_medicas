import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}



  create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const appointment = this.appointmentRepository.create(createAppointmentDto);
      return this.appointmentRepository.save(appointment);
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll() {
    try {
      const appointments = this.appointmentRepository.find();
      if(!appointments) {
        throw new BadRequestException('No appointments found');
      }
      return appointments
    } catch (error) {
      this.handleError(error);
    }
  }

  findOne(id: number) {
    try {
      const appointment = this.appointmentRepository.findOne({where: {appointment_id: id}});
      if(!appointment) {
        throw new BadRequestException('Appointment not found');
      }
      return appointment;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      const appointment = await this.appointmentRepository.update(id, updateAppointmentDto);
      if(appointment.affected === 0) {
        throw new BadRequestException('Appointment not found or not updated');
      }
      return this.findOne(id);
    } catch (error) {
      this.handleError(error);
    }
  }

  remove(id: number) {
    try {
      const appointment = this.appointmentRepository.delete(id);
      if(!appointment) {
        throw new BadRequestException('Appointment not found or not deleted');
      }
      return appointment;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: Error) {
    this.logger.error(error.message, error.stack);
    throw new BadRequestException(error.message);
  }
}
