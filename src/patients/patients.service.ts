import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService {

  private readonly logger = new Logger(PatientsService.name)

  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>
  ) {}

  create(createPatientDto: CreatePatientDto) {
    try {
      const patient = this.patientRepository.create(createPatientDto)
      return this.patientRepository.save(patient)
    } catch (error) {
      this.handleError(error)
    }
  }

  findAll() {
    try {
      const patients = this.patientRepository.find()
      if(!patients){
        throw new BadRequestException('No patients found')
      }
      return patients
    } catch (error) {
      this.handleError(error)
    }
  }

  findOne(id: number) {
    try {
      const patient = this.patientRepository.findOne({where: {patient_id: id}})
      if(!patient){
        throw new BadRequestException('Patient not found')
      }
      return patient
    } catch (error) {
      this.handleError(error)
    }
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try {
      const patient = await this.patientRepository.update(id, updatePatientDto)
      if(patient.affected === 0){
        throw new BadRequestException('Patient not found or not updated')
      }
      return this.findOne(id)
    } catch (error) {
      this.handleError(error)
    }
  }

  remove(id: number) {
    try {
      const patient = this.patientRepository.delete(id)
      if(!patient){
        throw new BadRequestException('Patient not found or not deleted')
      }
      return patient
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: Error){
    this.logger.error(error.message, error.stack)
    throw new BadRequestException(error.message)
  }
}
