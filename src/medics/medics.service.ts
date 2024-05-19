import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicEntity } from './entities/medic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicsService {

  private readonly logger = new Logger(MedicsService.name);

  constructor(
    @InjectRepository(MedicEntity)
    private readonly medicRepo: Repository<MedicEntity>
  ){}

  create(createMedicDto: CreateMedicDto) {
    try {
      const medic = this.medicRepo.create(createMedicDto);
      return this.medicRepo.save(medic);
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll() {
    try {
      const medics = this.medicRepo.find();
      if(!medics) {
        throw new Error('No medics found');
      }
      return medics
    } catch (error) {
      this.handleError(error);
    }
  }

  findOne(id: number) {
    try {
      const medic = this.medicRepo.findOne({where: {medic_id: id}});
      if(!medic) {
        throw new Error('No medic found');
      }
      return medic;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, updateMedicDto: UpdateMedicDto) {
    try {
      const medic = await this.medicRepo.update(id, updateMedicDto);
      if(medic.affected === 0) {
        throw new Error('No medic found or not updated');
      }
      return await this.findOne(id);
    } catch (error) {
      this.handleError(error);
    }
  }

  remove(id: number) {
    try {
      const medic = this.medicRepo.delete(id);
      if(!medic) {
        throw new Error('No medic found or not deleted');
      }
      return medic;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: Error) {
    this.logger.error(error.message, error.stack);
    throw new BadRequestException(error.message);
  }
}
