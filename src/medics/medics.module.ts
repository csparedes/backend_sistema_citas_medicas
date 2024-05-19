import { Module } from '@nestjs/common';
import { MedicsService } from './medics.service';
import { MedicsController } from './medics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicEntity } from './entities/medic.entity';

@Module({
  controllers: [MedicsController],
  providers: [MedicsService],
  imports: [TypeOrmModule.forFeature([MedicEntity])],
})
export class MedicsModule {}
